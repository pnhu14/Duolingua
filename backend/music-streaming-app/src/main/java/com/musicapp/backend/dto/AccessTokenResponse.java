package com.musicapp.backend.dto;

public record AccessTokenResponse(String accessToken, String tokenType, long expiresInSeconds) {}
