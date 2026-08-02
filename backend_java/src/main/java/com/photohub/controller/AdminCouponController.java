package com.photohub.controller;

import com.photohub.model.Coupon;
import com.photohub.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/coupons")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminCouponController {
    private final CouponService service;

    @GetMapping
    public List<Coupon> getAllCoupons() {
        return service.getAllCoupons();
    }

    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return service.createCoupon(coupon);
    }

    @DeleteMapping("/{id}")
    public void deleteCoupon(@PathVariable Long id) {
        service.deleteCoupon(id);
    }
}
