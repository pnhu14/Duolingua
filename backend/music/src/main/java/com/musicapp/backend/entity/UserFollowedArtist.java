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
@Table(name = "user_followed_artists")
@IdClass(UserFollowedArtist.UserFollowedArtistId.class)
public class UserFollowedArtist {

  @Id
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Id
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "artist_id", nullable = false)
  private Artist artist;

  @CreationTimestamp
  @Column(name = "followed_at", nullable = false, updatable = false)
  private Instant followedAt;

  public static class UserFollowedArtistId implements Serializable {
    private UUID user;
    private UUID artist;

    public UserFollowedArtistId() {}

    public UserFollowedArtistId(UUID user, UUID artist) {
      this.user = user;
      this.artist = artist;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) {
        return true;
      }
      if (o == null || getClass() != o.getClass()) {
        return false;
      }
      UserFollowedArtistId that = (UserFollowedArtistId) o;
      return Objects.equals(user, that.user) && Objects.equals(artist, that.artist);
    }

    @Override
    public int hashCode() {
      return Objects.hash(user, artist);
    }
  }
}
