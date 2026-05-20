package com.musicapp.backend.mapper;

import com.musicapp.backend.dto.SongDetailDto;
import com.musicapp.backend.entity.Song;

public final class SongDetailMapper {

  private SongDetailMapper() {}

  public static SongDetailDto toDto(Song song) {
    return new SongDetailDto(
        song.getId(),
        song.getTitle(),
        song.getSlug(),
        song.getDurationSeconds(),
        song.getAudioUrl(),
        song.getCoverUrl(),
        song.getReleaseDate(),
        song.getLyrics(),
        song.isExplicit(),
        song.getStatus(),
        song.getTrackNumber(),
        song.getDiscNumber(),
        ArtistMapper.toDto(song.getAlbum() == null ? null : song.getAlbum().getPrimaryArtist()),
        AlbumMapper.toDto(song.getAlbum()));
  }
}
