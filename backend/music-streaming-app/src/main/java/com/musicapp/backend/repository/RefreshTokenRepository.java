package com.musicapp.backend.repository;

import com.musicapp.backend.entity.RefreshToken;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

  Optional<RefreshToken> findByTokenHash(String tokenHash);

  @Modifying
  @Query("delete from RefreshToken rt where rt.tokenHash = :tokenHash and rt.user.id = :userId")
  int deleteByTokenHashAndUserId(
      @Param("tokenHash") String tokenHash, @Param("userId") UUID userId);
}
