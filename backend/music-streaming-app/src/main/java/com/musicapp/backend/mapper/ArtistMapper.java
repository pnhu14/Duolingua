package com.musicapp.backend.mapper;

import com.musicapp.backend.dto.ArtistDto;
import com.musicapp.backend.entity.Artist;

public final class ArtistMapper {

  private ArtistMapper() {}

  public static ArtistDto toDto(Artist artist) {
    if (artist == null) {
      return null;
    }

    return new ArtistDto(
        artist.getId(),
        artist.getName(),
        artist.getSlug(),
        artist.getBio(),
        artist.getImageUrl(),
        artist.getBannerUrl(),
        artist.getCountry(),
        artist.isVerified(),
        artist.getStatus(),
        artist.getCreatedAt());
  }
}
