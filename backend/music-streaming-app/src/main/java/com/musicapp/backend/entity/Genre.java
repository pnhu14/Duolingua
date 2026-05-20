package com.musicapp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Table(name = "genres")
public class Genre {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "genre_id", nullable = false, updatable = false)
  private Long id;

  @Column(name = "name", nullable = false, length = 120, unique = true)
  private String name;

  @Column(name = "slug", nullable = false, length = 160, unique = true)
  private String slug;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;
}
