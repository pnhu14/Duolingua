package com.musicapp.backend.repository;

import com.musicapp.backend.entity.UserLikedSong;
import com.musicapp.backend.entity.UserLikedSong.UserLikedSongId;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLikedSongRepository extends JpaRepository<UserLikedSong, UserLikedSongId> {

  @EntityGraph(attributePaths = "song.album.primaryArtist")
  List<UserLikedSong> findByUser_IdOrderByLikedAtDesc(UUID userId);

  boolean existsByUser_IdAndSong_Id(UUID userId, UUID songId);

  void deleteByUser_IdAndSong_Id(UUID userId, UUID songId);
}
