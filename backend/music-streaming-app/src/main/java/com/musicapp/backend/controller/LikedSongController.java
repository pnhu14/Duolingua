package com.musicapp.backend.controller;

import com.musicapp.backend.dto.LikedSongStatusResponse;
import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.security.UserPrincipal;
import com.musicapp.backend.service.LikedSongService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/me/liked-songs")
public class LikedSongController {

  private final LikedSongService likedSongService;

  @GetMapping
  public List<SongDto> getLikedSongs(@AuthenticationPrincipal UserPrincipal principal) {
    return likedSongService.getLikedSongs(principal.getId());
  }

  @PostMapping("/{songId}")
  public SongDto likeSong(
      @AuthenticationPrincipal UserPrincipal principal, @PathVariable UUID songId) {
    return likedSongService.likeSong(principal.getId(), songId);
  }

  @DeleteMapping("/{songId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void unlikeSong(
      @AuthenticationPrincipal UserPrincipal principal, @PathVariable UUID songId) {
    likedSongService.unlikeSong(principal.getId(), songId);
  }

  @GetMapping("/{songId}")
  public LikedSongStatusResponse getLikedSongStatus(
      @AuthenticationPrincipal UserPrincipal principal, @PathVariable UUID songId) {
    return likedSongService.getLikedSongStatus(principal.getId(), songId);
  }
}
