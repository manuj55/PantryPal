package com.pramukh.productservice.Repository;

import com.pramukh.productservice.Model.ProductEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

//Product Repository
public interface ProductRespository extends MongoRepository<ProductEntity, String> {

    List<ProductEntity> findByCategory(String category);

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<ProductEntity> searchByName(String name);


}
