package com.musicapp.backend.dto;

import com.musicapp.backend.model.Artist;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class SongDto {
    private Long id;
    private String title;
    private String audioUrl;
    private String imageUrl;
    private LocalDate releaseDate;
    private Artist artist;
}
