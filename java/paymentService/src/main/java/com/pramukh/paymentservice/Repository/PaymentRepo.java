package com.pramukh.paymentservice.Repository;

import com.pramukh.paymentservice.Model.PaymentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepo extends MongoRepository<PaymentEntity, String> {

}
