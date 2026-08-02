package com.photohub.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String discount;
    private String type;
    private int maxUses;
    private int usedCount;
    private String status;
}
