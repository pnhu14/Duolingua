package com.musicapp.backend.repository;

import com.musicapp.backend.entity.Artist;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, UUID> {

  List<Artist> findByDeletedAtIsNullOrderByNameAsc();

  List<Artist> findByDeletedAtIsNullAndNameContainingIgnoreCaseOrderByNameAsc(String name);

  Optional<Artist> findByIdAndDeletedAtIsNull(UUID id);

  boolean existsBySlugAndDeletedAtIsNull(String slug);

  boolean existsBySlugAndIdNotAndDeletedAtIsNull(String slug, UUID id);
}
