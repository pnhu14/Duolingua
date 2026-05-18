package com.musicapp.backend.controller;

import com.musicapp.backend.dto.ArtistDto;
import com.musicapp.backend.dto.ArtistRequest;
import com.musicapp.backend.service.ArtistService;
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
@RequestMapping("/api/artists")
public class ArtistController {

  private final ArtistService artistService;

  @GetMapping
  public List<ArtistDto> getArtists(@RequestParam(required = false) String name) {
    return artistService.getArtists(name);
  }

  @GetMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public ArtistDto getArtist(@PathVariable UUID id) {
    return artistService.getArtist(id);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ArtistDto createArtist(@RequestBody ArtistRequest request) {
    return artistService.createArtist(request);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.OK)
  public ArtistDto updateArtist(@PathVariable UUID id, @RequestBody ArtistRequest request) {
    return artistService.updateArtist(id, request);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteArtist(@PathVariable UUID id) {
    artistService.deleteArtist(id);
  }
}
