package com.pramukh.paymentservice.GlobalExceptionHandler;

public class PaymentFailureException extends RuntimeException {
    public PaymentFailureException(String s) {
        super(s);

    }
}
