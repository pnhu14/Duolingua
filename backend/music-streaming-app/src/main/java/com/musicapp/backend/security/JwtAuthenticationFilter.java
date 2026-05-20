package com.musicapp.backend.security;

import com.musicapp.backend.entity.User;
import com.musicapp.backend.repository.UserRepository;
import com.musicapp.backend.repository.UserRoleRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private static final String BEARER_PREFIX = "Bearer ";

  private final JwtUtil jwtUtil;
  private final UserRepository userRepository;
  private final UserRoleRepository userRoleRepository;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String authorizationHeader = request.getHeader("Authorization");
    if (authorizationHeader == null || !authorizationHeader.startsWith(BEARER_PREFIX)) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = authorizationHeader.substring(BEARER_PREFIX.length());
    if (SecurityContextHolder.getContext().getAuthentication() == null) {
      jwtUtil.extractUserId(token).ifPresent(userId -> authenticateRequest(userId, request));
    }

    filterChain.doFilter(request, response);
  }

  private void authenticateRequest(UUID userId, HttpServletRequest request) {
    User user = userRepository.findById(userId).orElse(null);
    if (user == null || !"ACTIVE".equals(user.getStatus())) {
      return;
    }

    List<String> roles = userRoleRepository.findRoleCodesByUserId(user.getId());
    UserPrincipal principal = new UserPrincipal(user, roles);
    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }
}
