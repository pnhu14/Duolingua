package com.musicapp.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "songs")
public class Song {
    @Id
    @Column(name = "song_id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "audio_url", length = 512)
    private String audioUrl;

    @Column(name = "image_url", length = 512)
    private String imageUrl;

    @Column(name = "artist_id")
    private Long artistId;

}