package com.pramukh.paymentservice.Controller;

import com.pramukh.paymentservice.DTO.PayementDetailsRequestDTO;
import com.pramukh.paymentservice.DTO.PayementDetailsResponseDTO;
import com.pramukh.paymentservice.DTO.PaymentRequestDto;
import com.pramukh.paymentservice.DTO.PaymentResponseDto;
import com.pramukh.paymentservice.Service.PaymentDetailsService;
import com.pramukh.paymentservice.Service.StripeService;
import com.stripe.exception.StripeException;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Slf4j
@RestController
@RequestMapping("/api")
@CrossOrigin
@Tag(name = "Payment API's")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    // Creating Stripe  payment
    @PostMapping("/payment")
    @RateLimiter(name = "paymentRateLimiter")
    @Operation(summary = "Make payment")
    public ResponseEntity<PaymentResponseDto> makePayment(@RequestBody PaymentRequestDto paymentRequestDto) throws StripeException {
        System.out.println("Payment triggeredd");
        PaymentResponseDto paymentResponseDto = stripeService.makepayment(paymentRequestDto);
        log.info("Payment successfully created");
        return ResponseEntity.ok(paymentResponseDto);
    }

    // Add payment details to DB
    @PostMapping("/paymentDetails")
    @RateLimiter(name = "paymentRateLimiter")
    @Operation(summary = "Add payment details")
    public ResponseEntity<PayementDetailsResponseDTO> addPaymentDetails(@RequestBody PayementDetailsRequestDTO payementDetailsRequestDTO) {
        PayementDetailsResponseDTO payementDetailsResponseDTO = paymentDetailsService.addPaymentDetails(payementDetailsRequestDTO);
        log.info("Payment details added successfully");
        return new ResponseEntity<>(payementDetailsResponseDTO, HttpStatus.OK);
    }
}
