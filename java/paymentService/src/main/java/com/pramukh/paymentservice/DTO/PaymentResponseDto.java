package com.pramukh.paymentservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDto {
    private String Id;
    private String paymentStatus;
    private String paymentMessage;
    private String paymentUrl;
}
