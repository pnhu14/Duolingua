package com.musicapp.backend.dto;

import java.time.LocalDate;
import java.util.UUID;

public record SongDto(
    UUID id,
    String title,
    String slug,
    Integer durationSeconds,
    String audioUrl,
    String coverUrl,
    LocalDate releaseDate,
    ArtistDto artist) {}
