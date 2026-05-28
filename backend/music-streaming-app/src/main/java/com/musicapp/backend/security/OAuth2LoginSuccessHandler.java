package com.musicapp.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musicapp.backend.dto.AuthResponse;
import com.musicapp.backend.dto.OAuth2UserInfo;
import com.musicapp.backend.service.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

  private final AuthService authService;
  private final ObjectMapper objectMapper;

  @Value("${app.frontend-url}")
  private String frontendUrl;

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request, HttpServletResponse response, Authentication authentication)
      throws IOException, ServletException {
    OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
    AuthResponse authResponse =
        authService.loginWithGoogle(
            new OAuth2UserInfo(
                oauthUser.getAttribute("email"),
                oauthUser.getAttribute("email_verified"),
                oauthUser.getAttribute("name"),
                oauthUser.getAttribute("picture")),
            request);

    response.sendRedirect(frontendUrl + "/#/auth/callback?auth=" + encode(authResponse));
  }

  private String encode(AuthResponse authResponse) throws IOException {
    byte[] json = objectMapper.writeValueAsString(authResponse).getBytes(StandardCharsets.UTF_8);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(json);
  }
}
