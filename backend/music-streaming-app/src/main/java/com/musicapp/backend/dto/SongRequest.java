package com.musicapp.backend.dto;

import java.time.LocalDate;
import java.util.UUID;

public record SongRequest(
    String title,
    String slug,
    Integer durationSeconds,
    LocalDate releaseDate,
    String audioUrl,
    String coverUrl,
    String lyrics,
    Boolean explicit,
    String status,
    UUID albumId,
    Integer trackNumber,
    Integer discNumber) {}
