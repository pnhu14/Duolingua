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
@Table(name = "user_liked_songs")
@IdClass(UserLikedSong.UserLikedSongId.class)
public class UserLikedSong {

  @Id
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Id
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "song_id", nullable = false)
  private Song song;

  @CreationTimestamp
  @Column(name = "liked_at", nullable = false, updatable = false)
  private Instant likedAt;

  public static class UserLikedSongId implements Serializable {
    private UUID user;
    private UUID song;

    public UserLikedSongId() {}

    public UserLikedSongId(UUID user, UUID song) {
      this.user = user;
      this.song = song;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) {
        return true;
      }
      if (o == null || getClass() != o.getClass()) {
        return false;
      }
      UserLikedSongId that = (UserLikedSongId) o;
      return Objects.equals(user, that.user) && Objects.equals(song, that.song);
    }

    @Override
    public int hashCode() {
      return Objects.hash(user, song);
    }
  }
}
