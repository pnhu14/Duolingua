package com.musicapp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
@Entity
@Table(name = "playlist_tracks")
@IdClass(PlaylistTrack.PlaylistTrackId.class)
public class PlaylistTrack {

  @Id
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "playlist_id", nullable = false)
  private Playlist playlist;

  @Id
  @Column(name = "position", nullable = false)
  private Integer position;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "song_id", nullable = false)
  private Song song;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "added_by_user_id")
  private User addedByUser;

  @CreationTimestamp
  @Column(name = "added_at", nullable = false, updatable = false)
  private Instant addedAt;

  public static class PlaylistTrackId implements Serializable {
    private UUID playlist;
    private Integer position;

    public PlaylistTrackId() {}

    public PlaylistTrackId(UUID playlist, Integer position) {
      this.playlist = playlist;
      this.position = position;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) {
        return true;
      }
      if (o == null || getClass() != o.getClass()) {
        return false;
      }
      PlaylistTrackId that = (PlaylistTrackId) o;
      return Objects.equals(playlist, that.playlist) && Objects.equals(position, that.position);
    }

    @Override
    public int hashCode() {
      return Objects.hash(playlist, position);
    }
  }
}
