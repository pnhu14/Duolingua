package com.musicapp.backend.security;

import com.musicapp.backend.entity.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private final SecretKey secretKey;
  private final Duration accessTokenTtl;

  public JwtUtil(
      @Value("${app.security.jwt.secret}") String jwtSecret,
      @Value("${app.security.jwt.access-token-minutes}") long accessTokenMinutes) {
    byte[] secretBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
    if (secretBytes.length < 32) {
      throw new IllegalStateException("JWT secret must be at least 32 bytes long");
    }

    this.secretKey = Keys.hmacShaKeyFor(secretBytes);
    this.accessTokenTtl = Duration.ofMinutes(accessTokenMinutes);
  }

  public String generateAccessToken(User user, Collection<String> roles) {
    Instant now = Instant.now();
    Instant expiresAt = now.plus(accessTokenTtl);

    return Jwts.builder()
        .subject(user.getId().toString())
        .claim("email", user.getEmail())
        .claim("username", user.getUsername())
        .claim("roles", List.copyOf(roles))
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiresAt))
        .signWith(secretKey)
        .compact();
  }

  public Optional<UUID> extractUserId(String token) {
    try {
      String subject =
          Jwts.parser()
              .verifyWith(secretKey)
              .build()
              .parseSignedClaims(token)
              .getPayload()
              .getSubject();
      return Optional.of(UUID.fromString(subject));
    } catch (IllegalArgumentException | JwtException ex) {
      return Optional.empty();
    }
  }

  public long getAccessTokenTtlSeconds() {
    return accessTokenTtl.toSeconds();
  }
}
