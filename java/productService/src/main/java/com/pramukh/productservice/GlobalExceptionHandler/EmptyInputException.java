package com.pramukh.productservice.GlobalExceptionHandler;

public class EmptyInputException extends RuntimeException {
    public EmptyInputException(String s) {
        super(s);
    }
}
