package com.photohub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @Column(nullable = false)
    private Long adminId;

    @Column(nullable = false)
    private String action; // e.g., "CREATE", "UPDATE", "DELETE"

    @Column(nullable = false)
    private String tableName; // affected table

    @Column(nullable = false)
    private Long recordId; // PK of affected row

    @Column(columnDefinition = "TEXT")
    private String oldValue; // JSON snapshot before change

    @Column(columnDefinition = "TEXT")
    private String newValue; // JSON snapshot after change

    private LocalDateTime createdAt = LocalDateTime.now();
}
