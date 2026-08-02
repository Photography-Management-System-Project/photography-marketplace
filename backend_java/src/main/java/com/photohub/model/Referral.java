package com.photohub.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Referral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String code;
    private int referred;
    private String earnings;
    private String status;
}
