package com.pramukh.productservice.GlobalExceptionHandler;

// Custom Exception for Product Not Found
public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String message) {
        super(message);
    }
}
