package com.musicapp.backend.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2LoginFailureHandler implements AuthenticationFailureHandler {

  private static final Logger LOGGER = LoggerFactory.getLogger(OAuth2LoginFailureHandler.class);

  @Value("${app.frontend-url}")
  private String frontendUrl;

  @Override
  public void onAuthenticationFailure(
      HttpServletRequest request, HttpServletResponse response, AuthenticationException exception)
      throws IOException, ServletException {
    String message = exception.getMessage();
    LOGGER.warn("Google OAuth login failed: {}", message);
    response.sendRedirect(frontendUrl + "/#/login?oauthError=" + encode(message));
  }

  private String encode(String value) {
    String safeValue = value == null ? "Google OAuth login failed" : value;
    return URLEncoder.encode(safeValue, StandardCharsets.UTF_8);
  }
}
