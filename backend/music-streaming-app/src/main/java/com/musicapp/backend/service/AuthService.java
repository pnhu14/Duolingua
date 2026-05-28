package com.musicapp.backend.service;

import com.musicapp.backend.dto.AccessTokenResponse;
import com.musicapp.backend.dto.AuthResponse;
import com.musicapp.backend.dto.LoginRequest;
import com.musicapp.backend.dto.LogoutRequest;
import com.musicapp.backend.dto.OAuth2UserInfo;
import com.musicapp.backend.dto.RefreshTokenRequest;
import com.musicapp.backend.dto.RegisterRequest;
import com.musicapp.backend.dto.UserResponse;
import com.musicapp.backend.entity.RefreshToken;
import com.musicapp.backend.entity.Role;
import com.musicapp.backend.entity.User;
import com.musicapp.backend.entity.UserRole;
import com.musicapp.backend.repository.RefreshTokenRepository;
import com.musicapp.backend.repository.RoleRepository;
import com.musicapp.backend.repository.UserRepository;
import com.musicapp.backend.repository.UserRoleRepository;
import com.musicapp.backend.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

  private static final String DEFAULT_ROLE = "USER";
  private static final String GOOGLE_PASSWORD_PREFIX = "google-oauth2:";
  private static final int REFRESH_TOKEN_BYTES = 48;

  private final SecureRandom secureRandom = new SecureRandom();
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final UserRoleRepository userRoleRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;

  @Value("${app.security.refresh-token-days}")
  private long refreshTokenDays;

  @Transactional
  public UserResponse register(RegisterRequest request) {
    String username = request.username().trim();
    String email = normalizeEmail(request.email());

    if (userRepository.existsByUsernameIgnoreCase(username)) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
    }
    if (userRepository.existsByEmailIgnoreCase(email)) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
    }

    User user = new User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setDisplayName(username);
    user.setStatus("ACTIVE");
    user.setRegistrationDate(Instant.now());
    User savedUser = userRepository.save(user);

    Role userRole =
        roleRepository
            .findByCode(DEFAULT_ROLE)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Default USER role is not configured"));
    UserRole userRoleLink = new UserRole();
    userRoleLink.setUser(savedUser);
    userRoleLink.setRole(userRole);
    userRoleRepository.save(userRoleLink);

    return UserResponse.from(savedUser, List.of(DEFAULT_ROLE));
  }

  @Transactional
  public AuthResponse login(LoginRequest request, HttpServletRequest servletRequest) {
    User user =
        userRepository
            .findByEmailIgnoreCase(normalizeEmail(request.email()))
            .orElseThrow(() -> invalidCredentials());

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw invalidCredentials();
    }
    if (!"ACTIVE".equals(user.getStatus())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User account is not active");
    }

    user.setLastLoginAt(Instant.now());
    List<String> roles = userRoleRepository.findRoleCodesByUserId(user.getId());
    String accessToken = jwtUtil.generateAccessToken(user, roles);
    String refreshToken = issueRefreshToken(user, servletRequest);

    return new AuthResponse(
        accessToken,
        refreshToken,
        "Bearer",
        jwtUtil.getAccessTokenTtlSeconds(),
        UserResponse.from(user, roles));
  }

  @Transactional
  public AuthResponse loginWithGoogle(
      OAuth2UserInfo oauth2User, HttpServletRequest servletRequest) {
    String email = normalizeEmail(requireOAuth2Email(oauth2User));
    if (!Boolean.TRUE.equals(oauth2User.emailVerified())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Google email is not verified");
    }

    User user =
        userRepository
            .findByEmailIgnoreCase(email)
            .orElseGet(() -> createGoogleUser(email, oauth2User));

    if (!"ACTIVE".equals(user.getStatus())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User account is not active");
    }

    if (StringUtils.hasText(oauth2User.picture())) {
      user.setAvatarUrl(oauth2User.picture());
    }
    if (user.getEmailVerifiedAt() == null) {
      user.setEmailVerifiedAt(Instant.now());
    }
    user.setLastLoginAt(Instant.now());

    List<String> roles = userRoleRepository.findRoleCodesByUserId(user.getId());
    String accessToken = jwtUtil.generateAccessToken(user, roles);
    String refreshToken = issueRefreshToken(user, servletRequest);

    return new AuthResponse(
        accessToken,
        refreshToken,
        "Bearer",
        jwtUtil.getAccessTokenTtlSeconds(),
        UserResponse.from(user, roles));
  }

  @Transactional
  public AccessTokenResponse refresh(RefreshTokenRequest request) {
    RefreshToken refreshToken =
        refreshTokenRepository
            .findByTokenHash(hashToken(request.refreshToken()))
            .orElseThrow(() -> invalidRefreshToken());

    Instant now = Instant.now();
    if (refreshToken.getRevokedAt() != null || !refreshToken.getExpiresAt().isAfter(now)) {
      if (!refreshToken.getExpiresAt().isAfter(now)) {
        refreshTokenRepository.delete(refreshToken);
      }
      throw invalidRefreshToken();
    }

    User user = refreshToken.getUser();
    if (!"ACTIVE".equals(user.getStatus())) {
      throw invalidRefreshToken();
    }

    List<String> roles = userRoleRepository.findRoleCodesByUserId(user.getId());
    String accessToken = jwtUtil.generateAccessToken(user, roles);
    return new AccessTokenResponse(accessToken, "Bearer", jwtUtil.getAccessTokenTtlSeconds());
  }

  @Transactional
  public void logout(UUID userId, LogoutRequest request) {
    refreshTokenRepository.deleteByTokenHashAndUserId(hashToken(request.refreshToken()), userId);
  }

  @Transactional(readOnly = true)
  public UserResponse getCurrentUser(UUID userId) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    List<String> roles = userRoleRepository.findRoleCodesByUserId(userId);
    return UserResponse.from(user, roles);
  }

  private String issueRefreshToken(User user, HttpServletRequest servletRequest) {
    Instant now = Instant.now();
    String token = generateOpaqueToken();

    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setUser(user);
    refreshToken.setTokenHash(hashToken(token));
    refreshToken.setIssuedAt(now);
    refreshToken.setExpiresAt(now.plus(Duration.ofDays(refreshTokenDays)));
    refreshToken.setIpAddress(resolveClientIp(servletRequest));
    refreshToken.setUserAgent(servletRequest.getHeader("User-Agent"));
    refreshTokenRepository.save(refreshToken);

    return token;
  }

  private User createGoogleUser(String email, OAuth2UserInfo oauth2User) {
    Instant now = Instant.now();
    User user = new User();
    user.setUsername(generateGoogleUsername(email));
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(GOOGLE_PASSWORD_PREFIX + UUID.randomUUID()));
    user.setDisplayName(resolveGoogleDisplayName(email, oauth2User));
    user.setAvatarUrl(oauth2User.picture());
    user.setStatus("ACTIVE");
    user.setRegistrationDate(now);
    user.setEmailVerifiedAt(now);
    User savedUser = userRepository.save(user);

    Role userRole =
        roleRepository
            .findByCode(DEFAULT_ROLE)
            .orElseThrow(
                () ->
                    new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "Default USER role is not configured"));
    UserRole userRoleLink = new UserRole();
    userRoleLink.setUser(savedUser);
    userRoleLink.setRole(userRole);
    userRoleRepository.save(userRoleLink);

    return savedUser;
  }

  private String generateGoogleUsername(String email) {
    String localPart = email.substring(0, email.indexOf('@')).replaceAll("[^a-zA-Z0-9_]", "_");
    String baseUsername = StringUtils.hasText(localPart) ? localPart : "google_user";
    if (baseUsername.length() > 90) {
      baseUsername = baseUsername.substring(0, 90);
    }
    String username = baseUsername;
    int suffix = 1;

    while (userRepository.existsByUsernameIgnoreCase(username)) {
      username = baseUsername + suffix;
      suffix++;
    }

    return username;
  }

  private String resolveGoogleDisplayName(String email, OAuth2UserInfo oauth2User) {
    return StringUtils.hasText(oauth2User.name())
        ? oauth2User.name()
        : email.substring(0, email.indexOf('@'));
  }

  private String requireOAuth2Email(OAuth2UserInfo oauth2User) {
    if (!StringUtils.hasText(oauth2User.email())) {
      throw new ResponseStatusException(
          HttpStatus.UNAUTHORIZED, "Google account does not include email");
    }
    return oauth2User.email();
  }

  private String generateOpaqueToken() {
    byte[] tokenBytes = new byte[REFRESH_TOKEN_BYTES];
    secureRandom.nextBytes(tokenBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
  }

  private String hashToken(String token) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
      return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
    } catch (NoSuchAlgorithmException ex) {
      throw new IllegalStateException("SHA-256 is not available", ex);
    }
  }

  private String normalizeEmail(String email) {
    return email.trim().toLowerCase();
  }

  private ResponseStatusException invalidCredentials() {
    return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  private ResponseStatusException invalidRefreshToken() {
    return new ResponseStatusException(
        HttpStatus.UNAUTHORIZED, "Refresh token is invalid or expired");
  }

  private String resolveClientIp(HttpServletRequest request) {
    String forwardedFor = request.getHeader("X-Forwarded-For");
    if (StringUtils.hasText(forwardedFor)) {
      return forwardedFor.split(",")[0].trim();
    }

    return request.getRemoteAddr();
  }
}
