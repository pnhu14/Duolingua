package com.musicapp.backend.controller;

import com.musicapp.backend.dto.SongDetailDto;
import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.dto.SongRequest;
import com.musicapp.backend.service.SongService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
  public SongDetailDto getSong(@PathVariable UUID id) {
    return songService.getSong(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public SongDetailDto createSong(@RequestBody SongRequest request) {
    return songService.createSong(request);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public SongDetailDto updateSong(@PathVariable UUID id, @RequestBody SongRequest request) {
    return songService.updateSong(id, request);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteSong(@PathVariable UUID id) {
    songService.deleteSong(id);
  }
}
