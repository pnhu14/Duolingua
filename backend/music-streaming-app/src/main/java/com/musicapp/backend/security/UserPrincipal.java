package com.musicapp.backend.security;

import com.musicapp.backend.entity.User;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {

  private final UUID id;
  private final String username;
  private final String email;
  private final String passwordHash;
  private final String displayName;
  private final String avatarUrl;
  private final String status;
  private final List<GrantedAuthority> authorities;

  public UserPrincipal(User user, Collection<String> roles) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.passwordHash = user.getPasswordHash();
    this.displayName = user.getDisplayName();
    this.avatarUrl = user.getAvatarUrl();
    this.status = user.getStatus();
    this.authorities =
        roles.stream()
            .map(role -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + role))
            .toList();
  }

  public UUID getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getDisplayName() {
    return displayName;
  }

  public String getAvatarUrl() {
    return avatarUrl;
  }

  public String getStatus() {
    return status;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return passwordHash;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return "ACTIVE".equals(status);
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return "ACTIVE".equals(status);
  }
}
