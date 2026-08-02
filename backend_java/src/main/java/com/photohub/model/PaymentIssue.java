package com.photohub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_issues")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentIssue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentIssueId;

    @Column(nullable = false)
    private Long paymentId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String issueType; // e.g., "CHARGEBACK", "REFUND_REQUEST"

    @Column(length = 1024)
    private String description;

    @Column(nullable = false)
    private String status = "OPEN"; // OPEN, RESOLVED, REJECTED

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime resolvedAt;
    private Long resolvedByAdmin;
}
