package com.example.easypark.controller;

import com.example.easypark.logic_layer.ParkingSpotService;
import com.example.easypark.model.ParkingSlot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/parking-slots")
public class ParkingSlotController {

    @Autowired
    private ParkingSpotService parkingSlotService;

    @GetMapping
    public ResponseEntity<List<ParkingSlot>> getAllParkingSpots() {
        List<ParkingSlot> slots = parkingSlotService.getAllParkingSlots();
        return ResponseEntity.ok(slots);
    }

    @PostMapping("/{id}/reserve")
    public ResponseEntity<?> reserveSpot(@PathVariable("id") Long id) {
        try {
            ParkingSlot reservedSlot = parkingSlotService.reserveSlot(id);
            if (reservedSlot == null) {
                return ResponseEntity.badRequest().body("Parking slot not found or already reserved.");
            }
            return ResponseEntity.ok(reservedSlot);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/free")
    public ResponseEntity<?> freeSlot(@PathVariable("id") Long id) {
        try {
            ParkingSlot freedSlot = parkingSlotService.freeSlot(id);
            if (freedSlot == null) {
                return ResponseEntity.badRequest().body("Parking slot not found or already free.");
            }
            return ResponseEntity.ok(freedSlot);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
