package com.pramukh.paymentservice.Service;

import com.pramukh.paymentservice.DTO.PayementDetailsRequestDTO;
import com.pramukh.paymentservice.DTO.PayementDetailsResponseDTO;
import com.pramukh.paymentservice.Model.PaymentEntity;
import com.pramukh.paymentservice.Repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsService {
    @Autowired
    private PaymentRepo paymentRepository;

    public PayementDetailsResponseDTO addPaymentDetails(PayementDetailsRequestDTO payementDetailsRequestDTO) {
        PaymentEntity payment = PaymentEntity.builder()
                .userId(payementDetailsRequestDTO.getUserId())
                .name(payementDetailsRequestDTO.getName())
                .amount(payementDetailsRequestDTO.getAmount())
                .paymentStatus(payementDetailsRequestDTO.getPaymentStatus())
                .build();


        paymentRepository.save(payment);
        return PayementDetailsResponseDTO.builder()
                .message("Payment details added successfully")
                .build();
    }
}
