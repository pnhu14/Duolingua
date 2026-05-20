package com.musicapp.backend.repository;

import com.musicapp.backend.entity.UserRole;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRole.UserRoleId> {

  @Query("select ur.role.code from UserRole ur where ur.user.id = :userId order by ur.role.code")
  List<String> findRoleCodesByUserId(@Param("userId") UUID userId);
}
