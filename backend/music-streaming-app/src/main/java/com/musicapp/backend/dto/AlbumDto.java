package com.musicapp.backend.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record AlbumDto(
    UUID id,
    String title,
    String slug,
    String description,
    LocalDate releaseDate,
    String coverUrl,
    String albumType,
    String status,
    ArtistDto primaryArtist,
    Instant createdAt) {}
