package com.photohub.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class CmsContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String heroTitle;
    @Column(columnDefinition = "TEXT")
    private String heroSubtitle;
    private String primaryButton;
    private String secondaryButton;
    
    @Column(columnDefinition = "TEXT")
    private String aboutUsText;
    
    @Column(columnDefinition = "TEXT")
    private String faqsJson;
}
