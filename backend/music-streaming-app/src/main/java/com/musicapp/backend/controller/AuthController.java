package com.musicapp.backend.controller;

import com.musicapp.backend.dto.AccessTokenResponse;
import com.musicapp.backend.dto.AuthResponse;
import com.musicapp.backend.dto.LoginRequest;
import com.musicapp.backend.dto.LogoutRequest;
import com.musicapp.backend.dto.RefreshTokenRequest;
import com.musicapp.backend.dto.RegisterRequest;
import com.musicapp.backend.dto.UserResponse;
import com.musicapp.backend.security.UserPrincipal;
import com.musicapp.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public UserResponse register(@Valid @RequestBody RegisterRequest request) {
    return authService.register(request);
  }

  @PostMapping("/login")
  public AuthResponse login(
      @Valid @RequestBody LoginRequest request, HttpServletRequest servletRequest) {
    return authService.login(request, servletRequest);
  }

  @PostMapping("/refresh")
  public AccessTokenResponse refresh(@Valid @RequestBody RefreshTokenRequest request) {
    return authService.refresh(request);
  }

  @PostMapping("/logout")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void logout(
      @AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody LogoutRequest request) {
    authService.logout(principal.getId(), request);
  }
}
