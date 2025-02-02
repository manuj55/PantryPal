package com.pramukh.paymentservice.DTO;

import lombok.Data;

@Data
public class PayementDetailsRequestDTO {
    private String userId;
    private String name;
    private Long amount;
    private String paymentStatus;

}
