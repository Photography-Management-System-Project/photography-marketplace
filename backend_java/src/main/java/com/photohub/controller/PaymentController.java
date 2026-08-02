package com.photohub.controller;

import com.photohub.model.Payment;
import com.photohub.repository.PaymentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentRepository repo;
    public PaymentController(PaymentRepository repo) { this.repo = repo; }
    @GetMapping
    public List<Payment> all() { return repo.findAll(); }
    @PostMapping
    public Payment create(@RequestBody Payment payment) { return repo.save(payment); }
}
