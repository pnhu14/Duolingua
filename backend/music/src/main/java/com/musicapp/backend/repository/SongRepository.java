package com.musicapp.backend.repository;

import com.musicapp.backend.entity.Song;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

  @EntityGraph(attributePaths = "artist")
  List<Song> findAllByOrderByTitleAsc();

  @EntityGraph(attributePaths = "artist")
  List<Song> findByTitleContainingIgnoreCaseOrderByTitleAsc(String title);
}
