package com.pramukh.paymentservice.GlobalExceptionHandler;
import io.github.resilience4j.ratelimiter.RequestNotPermitted;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

// Global Exception Handler
@ControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(PaymentFailureException.class)
        public ResponseEntity<String> PaymentFailureException(PaymentFailureException e) {
            return new  ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(RequestNotPermitted.class)
        public ResponseEntity<String> handleRequestNotPermitted(RequestNotPermitted ex) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests");
        }

    }


