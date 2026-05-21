package com.musicapp.backend.controller;

import com.musicapp.backend.dto.AlbumDto;
import com.musicapp.backend.service.AlbumService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/albums")
public class AlbumController {

  private final AlbumService albumService;

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public AlbumDto getAlbum(@PathVariable UUID id) {
    return albumService.getAlbum(id);
  }
}
