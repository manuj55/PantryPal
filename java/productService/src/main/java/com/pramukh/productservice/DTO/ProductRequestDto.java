package com.pramukh.productservice.DTO;

import lombok.Data;

// DTO for Product Request
@Data
public class ProductRequestDto {
    private String name;
    private String description;
    private int quantity;
    private String category;
    private double price;
}
