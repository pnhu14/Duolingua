package com.musicapp.backend.dto;

import java.time.Instant;
import java.util.UUID;

public record ArtistDto(
    UUID id,
    String name,
    String slug,
    String bio,
    String imageUrl,
    String bannerUrl,
    String country,
    boolean verified,
    String status,
    Instant createdAt) {}
