package com.musicapp.backend.service;

import com.musicapp.backend.dto.SongDetailDto;
import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.dto.SongRequest;
import com.musicapp.backend.entity.Album;
import com.musicapp.backend.entity.Song;
import com.musicapp.backend.mapper.SongDetailMapper;
import com.musicapp.backend.mapper.SongMapper;
import com.musicapp.backend.repository.AlbumRepository;
import com.musicapp.backend.repository.SongRepository;
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
public class SongService {

  private static final Set<String> ALLOWED_STATUSES =
      Set.of("DRAFT", "PUBLISHED", "ARCHIVED", "TAKEN_DOWN");

  private final SongRepository songRepository;
  private final AlbumRepository albumRepository;

  @Transactional(readOnly = true)
  public List<SongDto> getSongs(String title) {
    if (!StringUtils.hasText(title)) {
      return songRepository.findByDeletedAtIsNullOrderByTitleAsc().stream()
          .map((Song song) -> SongMapper.toDto(song))
          .toList();
    }

    return songRepository
        .findByDeletedAtIsNullAndTitleContainingIgnoreCaseOrderByTitleAsc(title.trim())
        .stream()
        .map((Song song) -> SongMapper.toDto(song))
        .toList();
  }

  @Transactional(readOnly = true)
  public SongDetailDto getSong(UUID id) {
    return songRepository
        .findByIdAndDeletedAtIsNull(id)
        .map(SongDetailMapper::toDto)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));
  }

  @Transactional
  public SongDetailDto createSong(SongRequest request) {
    Song song = new Song();
    applyRequest(song, request, true);
    return SongDetailMapper.toDto(songRepository.save(song));
  }

  @Transactional
  public SongDetailDto updateSong(UUID id, SongRequest request) {
    Song song =
        songRepository
            .findByIdAndDeletedAtIsNull(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));

    applyRequest(song, request, false);
    return SongDetailMapper.toDto(songRepository.save(song));
  }

  @Transactional
  public void deleteSong(UUID id) {
    Song song =
        songRepository
            .findByIdAndDeletedAtIsNull(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));

    song.setStatus("DELETED");
    song.setDeletedAt(Instant.now());
    songRepository.save(song);
  }

  private void applyRequest(Song song, SongRequest request, boolean creating) {
    if (request == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
    }

    song.setTitle(required(request.title(), "title"));

    String slug = required(request.slug(), "slug");
    boolean slugExists =
        creating
            ? songRepository.existsBySlugAndDeletedAtIsNull(slug)
            : songRepository.existsBySlugAndIdNotAndDeletedAtIsNull(slug, song.getId());
    if (slugExists) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Song slug already exists");
    }
    song.setSlug(slug);

    if (request.durationSeconds() == null || request.durationSeconds() <= 0) {
      throw new ResponseStatusException(
          HttpStatus.BAD_REQUEST, "durationSeconds must be greater than 0");
    }
    song.setDurationSeconds(request.durationSeconds());

    song.setReleaseDate(request.releaseDate());
    song.setAudioUrl(required(request.audioUrl(), "audioUrl"));
    song.setCoverUrl(blankToNull(request.coverUrl()));
    song.setLyrics(blankToNull(request.lyrics()));
    song.setExplicit(Boolean.TRUE.equals(request.explicit()));
    song.setStatus(normalizeStatus(request.status(), "PUBLISHED"));
    song.setAlbum(resolveAlbum(request.albumId()));
    song.setTrackNumber(request.trackNumber());
    song.setDiscNumber(request.discNumber());
  }

  private Album resolveAlbum(UUID albumId) {
    if (albumId == null) {
      return null;
    }

    return albumRepository
        .findById(albumId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Album not found"));
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
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid song status");
    }

    return normalized;
  }
}
