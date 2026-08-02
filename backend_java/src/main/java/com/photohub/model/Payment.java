package com.photohub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long bookingId; // optional reference to a booking

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String method; // e.g., "CREDIT_CARD", "PAYPAL"

    @Column(nullable = false)
    private String status; // e.g., "PENDING", "COMPLETED"

    private String transactionId; // external gateway identifier
    private String description;
}
