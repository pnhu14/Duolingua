package com.musicapp.backend.dto;

import java.time.Instant;

public record ArtistDto(Long id, String name, String bio, String imageUrl, Instant createdAt) {}
