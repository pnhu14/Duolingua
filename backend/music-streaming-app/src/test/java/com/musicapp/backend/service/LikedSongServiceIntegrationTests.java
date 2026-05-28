package com.musicapp.backend.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.entity.User;
import com.musicapp.backend.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class LikedSongServiceIntegrationTests {

  @Autowired private LikedSongService likedSongService;

  @Autowired private UserRepository userRepository;

  @Test
  void likesAndReturnsSongsForCurrentUser() {
    User user = new User();
    user.setUsername("liked-test-" + UUID.randomUUID());
    user.setEmail(UUID.randomUUID() + "@example.com");
    user.setPasswordHash("test");
    user.setDisplayName("Liked Test");
    user.setStatus("ACTIVE");
    user.setRegistrationDate(Instant.now());
    User savedUser = userRepository.save(user);

    UUID songId = UUID.fromString("40000000-0000-0000-0000-000000000001");

    likedSongService.likeSong(savedUser.getId(), songId);
    List<SongDto> likedSongs = likedSongService.getLikedSongs(savedUser.getId());

    assertThat(likedSongs).extracting(SongDto::id).contains(songId);
  }
}
