package com.musicapp.backend.dto;

import com.musicapp.backend.entity.User;
import java.util.Collection;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

public record UserResponse(
    UUID id,
    String username,
    String email,
    String displayName,
    String avatarUrl,
    String status,
    Set<String> roles) {

  public static UserResponse from(User user, Collection<String> roles) {
    return new UserResponse(
        user.getId(),
        user.getUsername(),
        user.getEmail(),
        user.getDisplayName(),
        user.getAvatarUrl(),
        user.getStatus(),
        Set.copyOf(new TreeSet<>(roles)));
  }
}
