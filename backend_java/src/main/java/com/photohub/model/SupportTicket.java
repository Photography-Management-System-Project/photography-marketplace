package com.photohub.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class SupportTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticketId;
    private String user;
    private String subject;
    private String status;
    private String priority;
    private String time;
    
    @Column(columnDefinition = "TEXT")
    private String messageHistory;
}
