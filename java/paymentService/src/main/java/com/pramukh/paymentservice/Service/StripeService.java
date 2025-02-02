package com.pramukh.paymentservice.Service;

import com.pramukh.paymentservice.DTO.PaymentRequestDto;
import com.pramukh.paymentservice.DTO.PaymentResponseDto;
import com.pramukh.paymentservice.GlobalExceptionHandler.PaymentFailureException;
import com.stripe.Stripe;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class StripeService {

    @Value("${stripe.sk}")
    private  String secretKey;


    public PaymentResponseDto makepayment(PaymentRequestDto paymentRequestDto) throws StripeException {
        Stripe.apiKey = secretKey;

        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
                .setName(paymentRequestDto.getName())
                .build();

        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("EUR")
                .setUnitAmount(paymentRequestDto.getAmount())
                .setProductData(productData)
                .build();

        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(priceData)
                .build();


        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .addLineItem(lineItem)
                .setSuccessUrl("http://localhost:8080/success")
                .setCancelUrl("http://localhost:8080/cancel")
                .build();

        Session session = null;
        try
        {
            session = Session.create(params);
            return PaymentResponseDto .builder()

                    .Id(session.getId())
                    .paymentStatus("success")
                    .paymentMessage("Created payment session")
                    .paymentUrl(session.getUrl())
                    .build();
        }
        catch (StripeException e)
        {
            throw new PaymentFailureException(e.getMessage());
        }
    }
}
