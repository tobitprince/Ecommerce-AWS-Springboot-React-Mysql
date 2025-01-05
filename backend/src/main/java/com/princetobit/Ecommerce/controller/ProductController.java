package com.princetobit.Ecommerce.controller;


import com.princetobit.Ecommerce.dto.Response;
import com.princetobit.Ecommerce.exception.InvalidCredentialsException;
import com.princetobit.Ecommerce.service.interf.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createProduct(
            @RequestParam Long categoryId,
            @RequestParam MultipartFile image,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam BigDecimal price
            ){
        if(categoryId == null || image.isEmpty() || name.isEmpty() || description.isEmpty() || price == null){
            throw new InvalidCredentialsException("All Fields are Required");
        }
        return ResponseEntity.ok(productService.createProduct(categoryId, image, name, description, price));
    }

    @PutMapping("/update/{productId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateProduct(
            @PathVariable Long productId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) BigDecimal price
    ){
        return ResponseEntity.ok(productService.updateProduct(productId, categoryId, image, name, description, price));
    }

    @DeleteMapping("/delete/{productId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteProduct(@PathVariable Long productId){
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    @GetMapping("/get-product-by-id/{productId}")
    public ResponseEntity<Response> getProductById(@PathVariable Long productId){
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/get-products-by-category-id/{categoryId}")
    public ResponseEntity<Response> getProductsByCategory(@PathVariable Long categoryId){
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/search-product")
    public ResponseEntity<Response> searchProduct(@RequestParam String searchValue){
        return ResponseEntity.ok(productService.searchProduct(searchValue));
    }

}
