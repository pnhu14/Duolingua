package com.musicapp.backend.dto;

import java.time.LocalDate;
import java.util.UUID;

public record SongDetailDto(
    UUID id,
    String title,
    String slug,
    Integer durationSeconds,
    String audioUrl,
    String coverUrl,
    LocalDate releaseDate,
    String lyrics,
    boolean explicit,
    String status,
    Integer trackNumber,
    Integer discNumber,
    ArtistDto artist,
    AlbumDto album) {}
