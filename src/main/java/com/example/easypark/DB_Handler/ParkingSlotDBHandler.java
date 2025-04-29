package com.example.easypark.DB_Handler;

import com.example.easypark.model.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSlotDBHandler extends JpaRepository<ParkingSlot, Long> {
}
