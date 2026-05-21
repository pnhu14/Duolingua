package com.musicapp.backend.service;

import com.musicapp.backend.dto.ArtistDto;
import com.musicapp.backend.dto.ArtistRequest;
import com.musicapp.backend.entity.Artist;
import com.musicapp.backend.mapper.ArtistMapper;
import com.musicapp.backend.repository.ArtistRepository;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ArtistService {

  private static final Set<String> ALLOWED_STATUSES =
      Set.of("ACTIVE", "INACTIVE", "ARCHIVED", "SUSPENDED");

  private final ArtistRepository artistRepository;

  @Transactional(readOnly = true)
  public List<ArtistDto> getArtists(String name) {
    if (!StringUtils.hasText(name)) {
      return artistRepository.findByDeletedAtIsNullOrderByNameAsc().stream()
          .map(ArtistMapper::toDto)
          .toList();
    }

    return artistRepository
        .findByDeletedAtIsNullAndNameContainingIgnoreCaseOrderByNameAsc(name.trim())
        .stream()
        .map(ArtistMapper::toDto)
        .toList();
  }

  @Transactional(readOnly = true)
  public ArtistDto getArtist(UUID id) {
    return artistRepository
        .findByIdAndDeletedAtIsNull(id)
        .map(ArtistMapper::toDto)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artist not found"));
  }

  @Transactional
  public ArtistDto createArtist(ArtistRequest request) {
    Artist artist = new Artist();
    applyRequest(artist, request, true);
    return ArtistMapper.toDto(artistRepository.save(artist));
  }

  @Transactional
  public ArtistDto updateArtist(UUID id, ArtistRequest request) {
    Artist artist =
        artistRepository
            .findByIdAndDeletedAtIsNull(id)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artist not found"));

    applyRequest(artist, request, false);
    return ArtistMapper.toDto(artistRepository.save(artist));
  }

  @Transactional
  public void deleteArtist(UUID id) {
    Artist artist =
        artistRepository
            .findByIdAndDeletedAtIsNull(id)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Artist not found"));

    artist.setStatus("DELETED");
    artist.setDeletedAt(Instant.now());
    artistRepository.save(artist);
  }

  private void applyRequest(Artist artist, ArtistRequest request, boolean creating) {
    if (request == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
    }

    artist.setName(required(request.name(), "name"));

    String slug = required(request.slug(), "slug");
    boolean slugExists =
        creating
            ? artistRepository.existsBySlugAndDeletedAtIsNull(slug)
            : artistRepository.existsBySlugAndIdNotAndDeletedAtIsNull(slug, artist.getId());
    if (slugExists) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Artist slug already exists");
    }
    artist.setSlug(slug);

    artist.setBio(blankToNull(request.bio()));
    artist.setImageUrl(blankToNull(request.imageUrl()));
    artist.setBannerUrl(blankToNull(request.bannerUrl()));
    artist.setCountry(blankToNull(request.country()));
    artist.setVerified(Boolean.TRUE.equals(request.verified()));
    artist.setStatus(normalizeStatus(request.status(), "ACTIVE"));
  }

  private String required(String value, String fieldName) {
    if (!StringUtils.hasText(value)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fieldName + " is required");
    }

    return value.trim();
  }

  private String blankToNull(String value) {
    return StringUtils.hasText(value) ? value.trim() : null;
  }

  private String normalizeStatus(String status, String defaultStatus) {
    String normalized = StringUtils.hasText(status) ? status.trim().toUpperCase() : defaultStatus;
    if (!ALLOWED_STATUSES.contains(normalized)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid artist status");
    }

    return normalized;
  }
}
