package com.musicapp.backend.mapper;

import com.musicapp.backend.dto.AlbumDto;
import com.musicapp.backend.entity.Album;

public final class AlbumMapper {

  private AlbumMapper() {}

  public static AlbumDto toDto(Album album) {
    if (album == null) {
      return null;
    }

    return new AlbumDto(
        album.getId(),
        album.getTitle(),
        album.getSlug(),
        album.getDescription(),
        album.getReleaseDate(),
        album.getCoverUrl(),
        album.getAlbumType(),
        album.getStatus(),
        ArtistMapper.toDto(album.getPrimaryArtist()),
        album.getCreatedAt());
  }
}
