package com.musicapp.backend.dto;

public record ArtistRequest(
    String name,
    String slug,
    String bio,
    String imageUrl,
    String bannerUrl,
    String country,
    Boolean verified,
    String status) {}
