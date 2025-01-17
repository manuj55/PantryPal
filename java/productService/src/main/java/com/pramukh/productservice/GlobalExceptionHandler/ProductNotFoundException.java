package com.pramukh.productservice.GlobalExceptionHandler;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String message) {
        super(message);
    }
}
