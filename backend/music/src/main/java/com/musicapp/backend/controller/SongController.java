package com.musicapp.backend.controller;

import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.service.SongService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
}
