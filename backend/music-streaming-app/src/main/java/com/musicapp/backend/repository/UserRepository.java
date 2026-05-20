package com.musicapp.backend.repository;

import com.musicapp.backend.entity.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByEmailIgnoreCase(String email);

  boolean existsByUsernameIgnoreCase(String username);

  boolean existsByEmailIgnoreCase(String email);
}
