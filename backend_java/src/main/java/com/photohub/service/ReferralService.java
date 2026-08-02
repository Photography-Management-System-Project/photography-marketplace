package com.photohub.service;

import com.photohub.model.Referral;
import com.photohub.repository.ReferralRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReferralService {
    private final ReferralRepository repository;

    public List<Referral> getAllReferrals() {
        return repository.findAll();
    }
}
