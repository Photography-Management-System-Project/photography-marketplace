package com.photohub.controller;

import com.photohub.dto.BookingDTO;
import com.photohub.dto.PhotographerDTO;
import com.photohub.dto.UserDTO;
import com.photohub.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(adminService.getAdminDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/photographers")
    public ResponseEntity<List<PhotographerDTO>> getAllPhotographers() {
        return ResponseEntity.ok(adminService.getAllPhotographers());
    }

    @PatchMapping("/photographers/{id}/verify")
    public ResponseEntity<PhotographerDTO> verifyPhotographer(@PathVariable Long id, @RequestParam boolean status) {
        return ResponseEntity.ok(adminService.verifyPhotographer(id, status));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.ok(adminService.getAllBookings());
    }
}
