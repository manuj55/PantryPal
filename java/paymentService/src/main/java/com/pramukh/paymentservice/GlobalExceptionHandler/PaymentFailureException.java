package com.pramukh.paymentservice.GlobalExceptionHandler;

// Custom Exception for Payment Failure
public class PaymentFailureException extends RuntimeException {
    public PaymentFailureException(String s) {
        super(s);

    }
}
