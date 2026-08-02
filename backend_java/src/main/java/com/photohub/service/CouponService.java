package com.photohub.service;

import com.photohub.model.Coupon;
import com.photohub.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponService {
    private final CouponRepository repository;

    public List<Coupon> getAllCoupons() {
        return repository.findAll();
    }

    public Coupon createCoupon(Coupon coupon) {
        return repository.save(coupon);
    }

    public void deleteCoupon(Long id) {
        repository.deleteById(id);
    }
}
