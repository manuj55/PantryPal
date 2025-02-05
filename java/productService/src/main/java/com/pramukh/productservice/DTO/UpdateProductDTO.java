package com.pramukh.productservice.DTO;

import lombok.Builder;
import lombok.Data;


// DTO for Update Product
@Data
@Builder
public class UpdateProductDTO {
    private String name;
    private String description;
    private int quantity;
    private String category;
    private double price;
}
