package com.pramukh.productservice.Controller;

import com.pramukh.productservice.DTO.ProductRequestDto;
import com.pramukh.productservice.DTO.ProductResponseDto;
import com.pramukh.productservice.DTO.UpdateProductDTO;
import com.pramukh.productservice.Service.ProductService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}, allowedHeaders = {"Authorization", "Content-Type", "Accept"})
@RestController
@RequestMapping("/api")
@Tag(name = "Product API's")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add products
    @PostMapping(value = "/products", consumes = "multipart/form-data")
    @Operation(summary = "Add products")
    @RateLimiter(name = "productRateLimiter")
    public ResponseEntity<String> getProducts(@RequestPart("product") List<ProductRequestDto> productRequestDto, @RequestPart("image") List<MultipartFile> file) throws IOException {
        productService.addProducts(productRequestDto, file);
        return new ResponseEntity<>("Product added successfully", HttpStatus.OK);
    }

    // Get all products
    @GetMapping("/products")
    @Operation(summary = "Get all products")
    @RateLimiter(name = "productRateLimiter")
    public ResponseEntity<List<ProductResponseDto>> getProducts() {
        List<ProductResponseDto> products = productService.getProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Get products by category
    @GetMapping("/products/category/{category}")
    @Operation(summary = "Get products by category")
    @RateLimiter(name = "productRateLimiter")
    public ResponseEntity<List<ProductResponseDto>> getProductsByCategory(@PathVariable String category) {
        List<ProductResponseDto> products = productService.getProductsByCategory(category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Get products by name
    @GetMapping("/products/{name}")
    @Operation(summary = "Get products by name")
    @RateLimiter(name = "productRateLimiter")
    public ResponseEntity<List<ProductResponseDto>> getProductsByName(@PathVariable String name) {
        List<ProductResponseDto> products = productService.getProductsByName(name);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Delete product by id
    @DeleteMapping("/products/{id}")
    @Operation(summary = "Delete product by id")
    @RateLimiter(name = "productRateLimiter")
    public ResponseEntity<String> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }

    // Update product by id
    @PutMapping("/products/{id}")
    @Operation(summary = "Update product by id")
    @RateLimiter(name = "productRateLimiter")
    public ResponseEntity<String> updateProduct(@PathVariable String id, @RequestBody UpdateProductDTO updateProductDTO) {
        productService.updateProduct(id, updateProductDTO);
        return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
    }

}
