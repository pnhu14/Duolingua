package com.musicapp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Table(name = "play_history")
public class PlayHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "play_history_id", nullable = false, updatable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "song_id", nullable = false)
  private Song song;

  @CreationTimestamp
  @Column(name = "played_at", nullable = false, updatable = false)
  private Instant playedAt;

  @Column(name = "played_seconds", nullable = false)
  private Integer playedSeconds;

  @Column(name = "source", nullable = false, length = 32)
  private String source;

  @Column(name = "device_type", length = 32)
  private String deviceType;

  @Column(name = "session_id", length = 128)
  private String sessionId;
}
