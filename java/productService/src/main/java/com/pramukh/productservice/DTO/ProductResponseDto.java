package com.pramukh.productservice.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponseDto {
    private String id;
    private String name;
    private String description;
    private int quantity;
    private String category;
    private double price;
    private String image;
}
