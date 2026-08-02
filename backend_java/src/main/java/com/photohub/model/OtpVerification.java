package com.photohub.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verifications")
public class OtpVerification {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String otp;
 private LocalDateTime expiryTime;
 private Boolean verified = false;

 @ManyToOne
 @JoinColumn(name = "user_id")
 private User user;
 // getters and setters
}
