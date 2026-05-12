package com.musicapp.backend.mapper;

import com.musicapp.backend.dto.ArtistDto;
import com.musicapp.backend.dto.SongDto;
import com.musicapp.backend.entity.Artist;
import com.musicapp.backend.entity.Song;

public final class SongMapper {

  private SongMapper() {}

  public static SongDto toDto(Song song) {
    return new SongDto(
        song.getId(),
        song.getTitle(),
        song.getDuration(),
        song.getAudioUrl(),
        song.getImageUrl(),
        song.getReleaseDate(),
        toArtistDto(song.getArtist()));
  }

  private static ArtistDto toArtistDto(Artist artist) {
    if (artist == null) {
      return null;
    }

    return new ArtistDto(
        artist.getId(),
        artist.getName(),
        artist.getBio(),
        artist.getImageUrl(),
        artist.getCreatedAt());
  }
}
