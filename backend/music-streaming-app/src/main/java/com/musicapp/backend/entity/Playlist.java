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
@Table(name = "playlists")
public class Playlist {

  @Id
  @GeneratedValue
  @JdbcTypeCode(SqlTypes.UUID)
  @Column(name = "playlist_id", nullable = false, updatable = false)
  private UUID id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "name", nullable = false, length = 255)
  private String name;

  @Column(name = "slug", nullable = false, length = 200, unique = true)
  private String slug;

  @Column(name = "description")
  private String description;

  @Column(name = "cover_url", length = 512)
  private String coverUrl;

  @Column(name = "visibility", nullable = false, length = 32)
  private String visibility;

  @Column(name = "collaborative", nullable = false)
  private boolean collaborative;

  @Column(name = "status", nullable = false, length = 32)
  private String status;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;
}
