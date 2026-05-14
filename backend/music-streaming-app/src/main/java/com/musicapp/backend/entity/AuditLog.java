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
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@Entity
@Table(name = "audit_logs")
public class AuditLog {

  @Id
  @GeneratedValue
  @Column(name = "audit_log_id", nullable = false, updatable = false)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(name = "action", nullable = false, length = 80)
  private String action;

  @Column(name = "entity_type", nullable = false, length = 80)
  private String entityType;

  @Column(name = "entity_id", length = 80)
  private String entityId;

  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "metadata")
  private String metadata;

  @Column(name = "ip_address", length = 64)
  private String ipAddress;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;
}
