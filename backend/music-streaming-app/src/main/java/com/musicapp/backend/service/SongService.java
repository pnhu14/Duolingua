package com.musicapp.backend.service;

import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.mapper.SongMapper;
import com.musicapp.backend.repository.SongRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SongService {

  private final SongRepository songRepository;

  public List<SongDto> getSongs(String title) {
    if (!StringUtils.hasText(title)) {
      return songRepository.findAllByOrderByTitleAsc().stream().map(SongMapper::toDto).toList();
    }

    return songRepository.findByTitleContainingIgnoreCaseOrderByTitleAsc(title.trim()).stream()
        .map(SongMapper::toDto)
        .toList();
  }
}
