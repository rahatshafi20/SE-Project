/*package com.example.easypark.logic_layer;


import com.example.easypark.DB_Handler.PaymentDBHandler;
import com.example.easypark.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentDBHandler paymentDBHandler;

    public Payment makePayment(Payment payment) {
        return paymentDBHandler.save(payment);
    }
}
*/
package com.example.easypark.logic_layer;

import com.example.easypark.DB_Handler.PaymentDBHandler;
import com.example.easypark.DB_Handler.ReservationDBHandler;  // Add Reservation handler
import com.example.easypark.model.Payment;
import com.example.easypark.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentDBHandler paymentDBHandler;

    @Autowired
    private ReservationDBHandler reservationDBHandler; // Inject Reservation repository

    public Payment makePayment(Payment payment) {
        // Fetch the reservation by id
        if (payment.getReservation() != null && payment.getReservation().getId() != null) {
            Reservation reservation = reservationDBHandler.findById(payment.getReservation().getId()).orElse(null);
            if (reservation != null) {
                payment.setReservation(reservation);
            } else {
                throw new IllegalArgumentException("Invalid Reservation ID");
            }
        }

        return paymentDBHandler.save(payment);  // Save the payment after linking reservation
    }
}
