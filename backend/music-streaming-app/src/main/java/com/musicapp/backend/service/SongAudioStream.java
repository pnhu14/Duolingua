package com.musicapp.backend.service;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

public record SongAudioStream(
    ResponseInputStream<GetObjectResponse> stream,
    String contentType,
    Long contentLength,
    String contentRange) {}
