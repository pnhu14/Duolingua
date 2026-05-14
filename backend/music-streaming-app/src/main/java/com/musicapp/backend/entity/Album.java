package com.musicapp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Entity
@Table(name = "albums")
public class Album {

  @Id
  @GeneratedValue
  @JdbcTypeCode(SqlTypes.UUID)
  @Column(name = "album_id", nullable = false, updatable = false)
  private UUID id;

  @Column(name = "title", nullable = false, length = 255)
  private String title;

  @Column(name = "slug", nullable = false, length = 200, unique = true)
  private String slug;

  @Column(name = "description")
  private String description;

  @Column(name = "release_date")
  private LocalDate releaseDate;

  @Column(name = "cover_url", length = 512)
  private String coverUrl;

  @Column(name = "album_type", nullable = false, length = 32)
  private String albumType;

  @Column(name = "status", nullable = false, length = 32)
  private String status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "primary_artist_id")
  private Artist primaryArtist;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;
}
