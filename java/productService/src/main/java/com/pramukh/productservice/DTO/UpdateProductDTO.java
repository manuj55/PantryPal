package com.pramukh.productservice.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateProductDTO {
    private String name;
    private String description;
    private int quantity;
    private String category;
    private double price;
}
