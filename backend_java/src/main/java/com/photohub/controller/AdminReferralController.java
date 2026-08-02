package com.photohub.controller;

import com.photohub.model.Referral;
import com.photohub.service.ReferralService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/referrals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminReferralController {
    private final ReferralService service;

    @GetMapping
    public List<Referral> getAllReferrals() {
        return service.getAllReferrals();
    }
}
