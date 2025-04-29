package com.example.easypark.logic_layer;


import com.example.easypark.DB_Handler.ReservationDBHandler;
import com.example.easypark.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationDBHandler reservationDBHandler;

    public List<Reservation> getAllReservations() {
        return reservationDBHandler.findAll();
    }

    public Reservation makeReservation(Reservation reservation) {
        return reservationDBHandler.save(reservation);
    }

    public void cancelReservation(Long id) {
        reservationDBHandler.deleteById(id);
    }
}
