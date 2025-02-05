package com.pramukh.productservice.GlobalExceptionHandler;

// Custom Exception for Empty Input
public class EmptyInputException extends RuntimeException {
    public EmptyInputException(String s) {
        super(s);
    }
}
