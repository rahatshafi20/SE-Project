package com.example.easypark.DB_Handler;

import com.example.easypark.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDBHandler extends JpaRepository<Payment, Long> {
}
