package com.musicapp.backend.service;

import com.musicapp.backend.dto.LikedSongStatusResponse;
import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.entity.Song;
import com.musicapp.backend.entity.UserLikedSong;
import com.musicapp.backend.mapper.SongMapper;
import com.musicapp.backend.repository.SongRepository;
import com.musicapp.backend.repository.UserLikedSongRepository;
import com.musicapp.backend.repository.UserRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class LikedSongService {

  private final UserLikedSongRepository likedSongRepository;
  private final UserRepository userRepository;
  private final SongRepository songRepository;

  @Transactional(readOnly = true)
  public List<SongDto> getLikedSongs(UUID userId) {
    return likedSongRepository.findByUser_IdOrderByLikedAtDesc(userId).stream()
        .map(UserLikedSong::getSong)
        .map(SongMapper::toDto)
        .toList();
  }

  @Transactional
  public SongDto likeSong(UUID userId, UUID songId) {
    Song song =
        songRepository
            .findByIdAndDeletedAtIsNull(songId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));

    if (!likedSongRepository.existsByUser_IdAndSong_Id(userId, songId)) {
      UserLikedSong likedSong = new UserLikedSong();
      likedSong.setUser(userRepository.getReferenceById(userId));
      likedSong.setSong(song);
      likedSongRepository.save(likedSong);
    }

    return SongMapper.toDto(song);
  }

  @Transactional
  public void unlikeSong(UUID userId, UUID songId) {
    likedSongRepository.deleteByUser_IdAndSong_Id(userId, songId);
  }

  @Transactional(readOnly = true)
  public LikedSongStatusResponse getLikedSongStatus(UUID userId, UUID songId) {
    return new LikedSongStatusResponse(
        likedSongRepository.existsByUser_IdAndSong_Id(userId, songId));
  }
}
