package com.example.easypark.logic_layer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.easypark.DB_Handler.ParkingSlotDBHandler;
import com.example.easypark.model.ParkingSlot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ParkingSpotService {

    private static final Logger logger = LoggerFactory.getLogger(ParkingSpotService.class);

    @Autowired
    private ParkingSlotDBHandler parkingSlotDBHandler;

    public List<ParkingSlot> getAllParkingSlots() {
        logger.info("Fetching all parking slots...");
        return parkingSlotDBHandler.findAll();
    }

    @Transactional
    public ParkingSlot reserveSlot(Long id) {
        logger.info("Reserving parking slot with ID: {}", id);
        ParkingSlot spot = parkingSlotDBHandler.findById(id).orElse(null);
        
        if (spot == null) {
            logger.error("Parking slot with ID {} not found.", id);
            throw new RuntimeException("Parking slot not found with ID: " + id);
        }
        
        if (!spot.isAvailable()) {
            logger.error("Parking slot with ID {} is already reserved.", id);
            throw new RuntimeException("Parking slot is already reserved.");
        }
        
        spot.setAvailable(false);
        ParkingSlot reservedSpot = parkingSlotDBHandler.save(spot);
        logger.info("Parking slot with ID {} reserved successfully.", id);
        return reservedSpot;
    }

    @Transactional
    public ParkingSlot freeSlot(Long id) {
        logger.info("Freeing parking slot with ID: {}", id);
        ParkingSlot spot = parkingSlotDBHandler.findById(id).orElse(null);
        
        if (spot == null) {
            logger.error("Parking slot with ID {} not found.", id);
            throw new RuntimeException("Parking slot not found with ID: " + id);
        }
        
        if (spot.isAvailable()) {
            logger.error("Parking slot with ID {} is already free.", id);
            throw new RuntimeException("Parking slot is already free.");
        }
        
        spot.setAvailable(true);
        ParkingSlot freedSpot = parkingSlotDBHandler.save(spot);
        logger.info("Parking slot with ID {} freed successfully.", id);
        return freedSpot;
    }
}
