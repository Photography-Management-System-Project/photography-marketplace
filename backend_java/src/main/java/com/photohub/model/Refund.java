package com.photohub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "refunds")
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refund_id;

    @Column(nullable = false)
    private Long booking_id;

    @Column(nullable = false)
    private Long payment_id;

    @Column(nullable = false)
    private Double refund_amount;

    private String refund_reason;
    private String refund_status; // Pending, Approved, Rejected
    private LocalDateTime created_at;
    private LocalDateTime processed_at;
    private Long approved_by_admin;

    // Getters and Setters omitted for brevity
}
