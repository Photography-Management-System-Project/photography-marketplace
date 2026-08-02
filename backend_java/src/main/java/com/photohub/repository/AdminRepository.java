package com.photohub.repository;

import com.photohub.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Additional query methods if needed, e.g., findByUsername
    Admin findByUsername(String username);
}
