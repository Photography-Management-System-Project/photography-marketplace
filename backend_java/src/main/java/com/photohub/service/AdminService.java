package com.photohub.service;

import com.photohub.dto.BookingDTO;
import com.photohub.dto.PhotographerDTO;
import com.photohub.dto.UserDTO;
import com.photohub.model.Booking;
import com.photohub.model.Photographer;
import com.photohub.model.User;
import com.photohub.repository.BookingRepository;
import com.photohub.repository.PhotographerRepository;
import com.photohub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotographerRepository photographerRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public Map<String, Object> getAdminDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalPhotographers", photographerRepository.count());
        stats.put("totalBookings", bookingRepository.count());
        return stats;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .filter(u -> !u.isDeleted())
                .map(this::mapUserToDTO)
                .collect(Collectors.toList());
    }

    public List<PhotographerDTO> getAllPhotographers() {
        return photographerRepository.findAll().stream()
                .filter(p -> !p.isDeleted())
                .map(this::mapPhotographerToDTO)
                .collect(Collectors.toList());
    }

    public PhotographerDTO verifyPhotographer(Long id, boolean status) {
        Photographer photographer = photographerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Photographer not found"));
        photographer.setVerified(status);
        Photographer updated = photographerRepository.save(photographer);
        return mapPhotographerToDTO(updated);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDeleted(true);
        userRepository.save(user);
    }

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .filter(b -> !b.isDeleted())
                .map(this::mapBookingToDTO)
                .collect(Collectors.toList());
    }

    // Helper mapping methods
    private UserDTO mapUserToDTO(User user) {
        return UserDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .profilePicture(user.getProfilePicture())
                .status(user.getStatus())
                .build();
    }

    private PhotographerDTO mapPhotographerToDTO(Photographer p) {
        return PhotographerDTO.builder()
                .photographerId(p.getPhotographerId())
                .userId(p.getUser().getUserId())
                .name(p.getUser().getName())
                .experience(p.getExperience())
                .bio(p.getBio())
                .location(p.getLocation())
                .rating(p.getRating())
                .pricePerHour(p.getPricePerHour())
                .isVerified(p.isVerified())
                .coverImage(p.getCoverImage())
                .specialties(p.getSpecialties())
                .build();
    }

    private BookingDTO mapBookingToDTO(Booking b) {
        return BookingDTO.builder()
                .bookingId(b.getBookingId())
                .userId(b.getUser().getUserId())
                .photographerId(b.getPhotographer().getPhotographerId())
                .packageId(b.getAPackage().getPackageId())
                .eventId(b.getEventId())
                .bookingDate(b.getBookingDate())
                .bookingTime(b.getBookingTime())
                .location(b.getLocation())
                .specialRequirements(b.getSpecialRequirements())
                .totalPrice(b.getTotalPrice())
                .bookingStatus(b.getBookingStatus())
                .build();
    }
}
