package com.musicapp.backend.dto;

public record OAuth2UserInfo(String email, Boolean emailVerified, String name, String picture) {}
