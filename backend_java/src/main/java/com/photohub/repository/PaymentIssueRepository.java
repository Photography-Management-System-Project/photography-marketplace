package com.photohub.repository;

import com.photohub.model.PaymentIssue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentIssueRepository extends JpaRepository<PaymentIssue, Long> {}
