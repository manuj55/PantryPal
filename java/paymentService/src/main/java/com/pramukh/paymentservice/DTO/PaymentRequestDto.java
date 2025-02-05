package com.pramukh.paymentservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO for Stripe Payment Request
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDto {

    private String name;
    private Long amount;
}
