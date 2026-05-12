package com.musicapp.backend.dto;

import java.time.LocalDate;

public record SongDto(
    Long id,
    String title,
    Integer duration,
    String audioUrl,
    String imageUrl,
    LocalDate releaseDate,
    ArtistDto artist) {}
