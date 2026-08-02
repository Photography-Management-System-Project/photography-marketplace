package com.photohub.service;

import com.photohub.dto.LoginRequest;
import com.photohub.dto.RegisterRequest;
import com.photohub.model.Photographer;
import com.photohub.model.Role;
import com.photohub.model.User;
import com.photohub.repository.PhotographerRepository;
import com.photohub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotographerRepository photographerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .status("active")
                .isDeleted(false)
                .build();

        User savedUser = userRepository.save(user);

        // If user is a photographer, also create a photographer profile
        if (savedUser.getRole() == Role.PHOTOGRAPHER) {
            Photographer photographer = Photographer.builder()
                    .user(savedUser)
                    .isVerified(false)
                    .isDeleted(false)
                    .build();
            photographerRepository.save(photographer);
        }

        return savedUser;
    }

    @Transactional
    public void changePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
