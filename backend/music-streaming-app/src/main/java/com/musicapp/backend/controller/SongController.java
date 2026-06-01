package com.musicapp.backend.controller;

import com.musicapp.backend.dto.SongDetailDto;
import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.dto.SongRequest;
import com.musicapp.backend.dto.SongStreamUrlResponse;
import com.musicapp.backend.service.SongAudioStream;
import com.musicapp.backend.service.SongService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/songs")
public class SongController {

  private final SongService songService;

  @GetMapping
  public List<SongDto> getSongs(@RequestParam(required = false) String title) {
    return songService.getSongs(title);
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public SongDetailDto getSong(@PathVariable String id) {
    return songService.getSong(id);
  }

  @GetMapping("/{id}/stream-url")
  @ResponseStatus(HttpStatus.OK)
  public SongStreamUrlResponse getSongStreamUrl(@PathVariable String id) {
    return new SongStreamUrlResponse(songService.getSongStreamUrl(id));
  }

  @GetMapping("/{id}/stream")
  @ResponseStatus(HttpStatus.OK)
  public ResponseEntity<StreamingResponseBody> streamSong(
      @PathVariable String id,
      @RequestHeader(value = HttpHeaders.RANGE, required = false) String range) {
    SongAudioStream audio = songService.streamSong(id, range);
    StreamingResponseBody body =
        outputStream -> {
          try (var stream = audio.stream()) {
            stream.transferTo(outputStream);
          }
        };

    ResponseEntity.BodyBuilder response =
        audio.contentRange() == null
            ? ResponseEntity.ok()
            : ResponseEntity.status(HttpStatus.PARTIAL_CONTENT);
    response.header(HttpHeaders.ACCEPT_RANGES, "bytes");
    if (audio.contentLength() != null) {
      response.contentLength(audio.contentLength());
    }
    if (audio.contentRange() != null) {
      response.header(HttpHeaders.CONTENT_RANGE, audio.contentRange());
    }

    return response.contentType(MediaType.parseMediaType(audio.contentType())).body(body);
  }

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  @ResponseStatus(HttpStatus.CREATED)
  public SongDetailDto createSong(@RequestBody SongRequest request) {
    return songService.createSong(request);
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  @ResponseStatus(HttpStatus.OK)
  public SongDetailDto updateSong(@PathVariable UUID id, @RequestBody SongRequest request) {
    return songService.updateSong(id, request);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteSong(@PathVariable UUID id) {
    songService.deleteSong(id);
  }
}
