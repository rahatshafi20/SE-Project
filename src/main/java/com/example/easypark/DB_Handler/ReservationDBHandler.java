package com.example.easypark.DB_Handler;

import com.example.easypark.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationDBHandler extends JpaRepository<Reservation, Long> {
}
