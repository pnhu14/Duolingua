package com.musicapp.backend.repository;

import com.musicapp.backend.entity.Album;
import java.util.UUID;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, UUID> {

  @EntityGraph(attributePaths = "primaryArtist")
  java.util.Optional<Album> findById(UUID id);
}
