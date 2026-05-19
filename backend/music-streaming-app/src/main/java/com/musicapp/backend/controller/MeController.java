package com.musicapp.backend.controller;

import com.musicapp.backend.dto.UserResponse;
import com.musicapp.backend.security.UserPrincipal;
import com.musicapp.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/me")
public class MeController {

  private final AuthService authService;

  @GetMapping
  public UserResponse getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
    return authService.getCurrentUser(principal.getId());
  }
}
