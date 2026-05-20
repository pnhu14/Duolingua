package com.musicapp.backend.service;

import com.musicapp.backend.dto.AlbumDto;
import com.musicapp.backend.mapper.AlbumMapper;
import com.musicapp.backend.repository.AlbumRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumService {

  private final AlbumRepository albumRepository;

  public AlbumDto getAlbum(UUID id) {
    return albumRepository
        .findById(id)
        .map(AlbumMapper::toDto)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Album not found"));
  }
}
