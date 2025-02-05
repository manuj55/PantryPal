package com.pramukh.paymentservice.DTO;

import lombok.Data;

// DTO for Payment Details Request
@Data
public class PayementDetailsRequestDTO {
    private String userId;
    private String name;
    private Long amount;
    private String paymentStatus;

}
