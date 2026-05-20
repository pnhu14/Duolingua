package com.musicapp.backend.mapper;

import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.entity.Song;

public final class SongMapper {

  private SongMapper() {}

  public static SongDto toDto(Song song) {
    return new SongDto(
        song.getId(),
        song.getTitle(),
        song.getSlug(),
        song.getDurationSeconds(),
        song.getAudioUrl(),
        song.getCoverUrl(),
        song.getReleaseDate(),
        ArtistMapper.toDto(song.getAlbum() == null ? null : song.getAlbum().getPrimaryArtist()));
  }
}
