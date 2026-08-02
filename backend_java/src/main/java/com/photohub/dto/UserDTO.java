package com.photohub.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private Long userId;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String profilePicture;
    private String status;
}
