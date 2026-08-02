package com.photohub.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PlatformSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String platformName;
    private String supportEmail;
    private boolean maintenanceMode;
    private boolean autoApprovePhotographers;
    private boolean requireEmailVerification;
}
