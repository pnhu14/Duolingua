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
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@Service
@RequiredArgsConstructor
public class SongService {

  private static final Set<String> ALLOWED_STATUSES =
      Set.of("DRAFT", "PUBLISHED", "ARCHIVED", "TAKEN_DOWN");

  private final SongRepository songRepository;
  private final AlbumRepository albumRepository;
  private final R2StorageService r2StorageService;

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
    return SongDetailMapper.toDto(findPublishedSong(id));
  }

  @Transactional(readOnly = true)
  public SongDetailDto getSong(String identifier) {
    return SongDetailMapper.toDto(findPublishedSong(identifier));
  }

  @Transactional(readOnly = true)
  public String getSongStreamUrl(UUID id) {
    Song song = findPublishedSong(id);

    return r2StorageService.createReadUrl(song.getAudioUrl());
  }

  @Transactional(readOnly = true)
  public String getSongStreamUrl(String identifier) {
    Song song = findPublishedSong(identifier);

    return r2StorageService.createReadUrl(song.getAudioUrl());
  }

  @Transactional(readOnly = true)
  public SongAudioStream streamSong(String identifier, String range) {
    Song song = findPublishedSong(identifier);

    var stream = r2StorageService.openReadStream(song.getAudioUrl(), normalizeRange(range));
    GetObjectResponse response = stream.response();
    return new SongAudioStream(
        stream,
        resolveAudioContentType(song.getAudioUrl(), response.contentType()),
        response.contentLength(),
        response.contentRange());
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

  private Song findPublishedSong(UUID id) {
    return songRepository
        .findByIdAndDeletedAtIsNull(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));
  }

  private Song findPublishedSong(String identifier) {
    if (!StringUtils.hasText(identifier)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found");
    }

    try {
      return findPublishedSong(UUID.fromString(identifier.trim()));
    } catch (IllegalArgumentException ignored) {
      return songRepository
          .findBySlugAndDeletedAtIsNull(identifier.trim())
          .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Song not found"));
    }
  }

  private String normalizeRange(String range) {
    if (!StringUtils.hasText(range)) {
      return null;
    }

    String normalized = range.trim();
    if (!normalized.startsWith("bytes=") || normalized.contains(",")) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid audio range header");
    }

    return normalized;
  }

  private String resolveAudioContentType(String audioUrl, String storedContentType) {
    if (StringUtils.hasText(storedContentType)) {
      return storedContentType;
    }

    if (audioUrl == null) {
      return "application/octet-stream";
    }

    String normalized = audioUrl.toLowerCase();
    if (normalized.endsWith(".wav")) {
      return "audio/wav";
    }
    if (normalized.endsWith(".mp3")) {
      return "audio/mpeg";
    }
    if (normalized.endsWith(".ogg")) {
      return "audio/ogg";
    }

    return "application/octet-stream";
  }
}
