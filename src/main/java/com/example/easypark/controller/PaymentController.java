/*package com.example.easypark.controller;

import com.example.easypark.logic_layer.PaymentService;
import com.example.easypark.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment makePayment(@RequestBody Payment payment) {
        return paymentService.makePayment(payment);
    }
}
*/
package com.example.easypark.controller;

import com.example.easypark.logic_layer.PaymentService;
import com.example.easypark.model.Payment;
import com.example.easypark.model.Reservation;
import com.example.easypark.DB_Handler.ReservationDBHandler;  // Add your Reservation repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ReservationDBHandler reservationDBHandler;

    @PostMapping
    public Payment makePayment(@RequestBody Payment payment) {
        // Ensure the reservation ID is present in the request
        if (payment.getReservation() != null && payment.getReservation().getId() != null) {
            // Fetch the corresponding reservation by its ID
            Reservation reservation = reservationDBHandler.findById(payment.getReservation().getId()).orElse(null);
            if (reservation != null) {
                payment.setReservation(reservation);  // Set the reservation object in the payment
            } else {
                throw new IllegalArgumentException("Reservation not found with ID: " + payment.getReservation().getId());
            }
        } else {
            throw new IllegalArgumentException("Payment must include a valid Reservation ID");
        }

        // Save the payment to the database
        return paymentService.makePayment(payment);
    }
}

