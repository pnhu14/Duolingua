package com.musicapp.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.entity.Song;
import com.musicapp.backend.entity.User;
import com.musicapp.backend.entity.UserLikedSong;
import com.musicapp.backend.repository.SongRepository;
import com.musicapp.backend.repository.UserLikedSongRepository;
import com.musicapp.backend.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class LikedSongServiceTests {

  @Mock private UserLikedSongRepository likedSongRepository;

  @Mock private UserRepository userRepository;

  @Mock private SongRepository songRepository;

  @InjectMocks private LikedSongService likedSongService;

  @Test
  void getLikedSongsReturnsSongsForUser() {
    UUID userId = UUID.randomUUID();
    Song song = song("First song");
    UserLikedSong likedSong = new UserLikedSong();
    likedSong.setSong(song);

    when(likedSongRepository.findByUser_IdOrderByLikedAtDesc(userId))
        .thenReturn(List.of(likedSong));

    List<SongDto> likedSongs = likedSongService.getLikedSongs(userId);

    assertThat(likedSongs).extracting(SongDto::title).containsExactly("First song");
  }

  @Test
  void likeSongCreatesLikedSongWhenMissing() {
    UUID userId = UUID.randomUUID();
    UUID songId = UUID.randomUUID();
    User user = new User();
    user.setId(userId);
    Song song = song(songId, "Liked song");

    when(songRepository.findByIdAndDeletedAtIsNull(songId)).thenReturn(Optional.of(song));
    when(likedSongRepository.existsByUser_IdAndSong_Id(userId, songId)).thenReturn(false);
    when(userRepository.getReferenceById(userId)).thenReturn(user);

    SongDto likedSong = likedSongService.likeSong(userId, songId);

    ArgumentCaptor<UserLikedSong> captor = ArgumentCaptor.forClass(UserLikedSong.class);
    verify(likedSongRepository).save(captor.capture());
    assertThat(captor.getValue().getUser()).isSameAs(user);
    assertThat(captor.getValue().getSong()).isSameAs(song);
    assertThat(likedSong.title()).isEqualTo("Liked song");
  }

  @Test
  void likeSongDoesNotCreateDuplicate() {
    UUID userId = UUID.randomUUID();
    UUID songId = UUID.randomUUID();
    Song song = song(songId, "Already liked");

    when(songRepository.findByIdAndDeletedAtIsNull(songId)).thenReturn(Optional.of(song));
    when(likedSongRepository.existsByUser_IdAndSong_Id(userId, songId)).thenReturn(true);

    likedSongService.likeSong(userId, songId);

    verify(likedSongRepository, never()).save(org.mockito.ArgumentMatchers.any());
  }

  @Test
  void likeSongRejectsMissingSong() {
    UUID userId = UUID.randomUUID();
    UUID songId = UUID.randomUUID();

    when(songRepository.findByIdAndDeletedAtIsNull(songId)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> likedSongService.likeSong(userId, songId))
        .isInstanceOf(ResponseStatusException.class)
        .hasMessageContaining("Song not found");
  }

  @Test
  void unlikeSongDeletesUserSongPair() {
    UUID userId = UUID.randomUUID();
    UUID songId = UUID.randomUUID();

    likedSongService.unlikeSong(userId, songId);

    verify(likedSongRepository).deleteByUser_IdAndSong_Id(userId, songId);
  }

  private Song song(String title) {
    return song(UUID.randomUUID(), title);
  }

  private Song song(UUID id, String title) {
    Song song = new Song();
    song.setId(id);
    song.setTitle(title);
    song.setSlug(title.toLowerCase().replace(" ", "-"));
    song.setDurationSeconds(180);
    song.setAudioUrl("https://example.com/song.mp3");
    return song;
  }
}
