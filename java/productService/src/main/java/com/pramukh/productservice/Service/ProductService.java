package com.pramukh.productservice.Service;

import com.pramukh.productservice.DTO.ProductRequestDto;
import com.pramukh.productservice.DTO.ProductResponseDto;
import com.pramukh.productservice.DTO.UpdateProductDTO;
import com.pramukh.productservice.GlobalExceptionHandler.EmptyInputException;
import com.pramukh.productservice.GlobalExceptionHandler.ProductNotFoundException;
import com.pramukh.productservice.Model.ProductEntity;
import com.pramukh.productservice.Repository.ProductRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService {

    @Autowired
    private ProductRespository productRespository;

    public String addProducts(List<ProductRequestDto> productRequestDto , List<MultipartFile> files) throws IOException {

        if (productRequestDto.size() != files.size()) {
            throw new EmptyInputException("Product and image count should be same");
        }
        List<ProductEntity> products = new ArrayList<>();
        for (int i = 0; i < productRequestDto.size(); i++) {
            ProductEntity product = ProductEntity.builder()
                    .name(productRequestDto.get(i).getName())
                    .description(productRequestDto.get(i).getDescription())
                    .quantity(productRequestDto.get(i).getQuantity())
                    .category(productRequestDto.get(i).getCategory())
                    .price(productRequestDto.get(i).getPrice())
                    .image(files.get(i).getBytes())
                    .build();
            products.add(product);
        }
        productRespository.saveAll(products);
        return "Products added successfully";
    }


    public List<ProductResponseDto> getProducts()  {
        List<ProductResponseDto> products = new ArrayList<>();
        List<ProductEntity> productEntities=  productRespository.findAll();
        if(productEntities.isEmpty()){
            throw new ProductNotFoundException("No products found");
        }
        for(ProductEntity product: productEntities){
            products.add(ProductResponseDto.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .description(product.getDescription())
                    .quantity(product.getQuantity())
                    .category(product.getCategory())
                    .price(product.getPrice())
                    .image(Base64.getEncoder().encodeToString(product.getImage()))
                    .build());
        }
        return products;
    }

    public List<ProductResponseDto> getProductsByCategory(String category) {
        List<ProductResponseDto> products = new ArrayList<>();
        List<ProductEntity> productList=  productRespository.findByCategory(category);
        if(productList.isEmpty()){
            throw new ProductNotFoundException("No products found in this category");
        }
        for(ProductEntity product: productList){
            products.add(ProductResponseDto.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .description(product.getDescription())
                    .quantity(product.getQuantity())
                    .category(product.getCategory())
                    .price(product.getPrice())
                    .image(Base64.getEncoder().encodeToString(product.getImage()))
                    .build());
        }
        return products;
    }

    public List<ProductResponseDto> getProductsByName(String name) {
        List<ProductResponseDto> products = new ArrayList<>();
        List<ProductEntity> productList=  productRespository.searchByName(name);
        if(productList.isEmpty()){
            throw new ProductNotFoundException("No products found with this name");
        }
        for(ProductEntity product: productList){
            products.add(ProductResponseDto.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .description(product.getDescription())
                    .quantity(product.getQuantity())
                    .category(product.getCategory())
                    .price(product.getPrice())
                    .image(Base64.getEncoder().encodeToString(product.getImage()))
                    .build());
        }
        return products;
    }

    public String deleteProduct(String id) {
        System.out.println("Entered delete product service");
        Optional<ProductEntity> result = productRespository.findById(id);
        if (result.isEmpty()) {
            throw new ProductNotFoundException("Product not found");
        }
        productRespository.deleteById(id);
        return "Product deleted successfully";
    }


    public String updateProduct(String id, UpdateProductDTO updateProductDTO) {
        Optional<ProductEntity> result = productRespository.findById(id);
        if (result.isEmpty()) {
            throw new ProductNotFoundException("Product not found");
        }

        ProductEntity product = ProductEntity.builder(
                .id(id)
                .name(updateProductDTO.getName())
                .description(updateProductDTO.getDescription())
                .quantity(updateProductDTO.getQuantity())
                .category(updateProductDTO.getCategory())
                .price(updateProductDTO.getPrice())
                .build();
        );

        return "Product updated successfully";
    }
}
