package com.princetobit.Ecommerce.service.interf;

import com.princetobit.Ecommerce.dto.CategoryDto;
import com.princetobit.Ecommerce.dto.Response;

public interface CategoryService {

    Response createCategory(CategoryDto categoryRequest);
    Response updateCategory(Long categoryId, CategoryDto categoryRequest);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);
    Response deleteCategory(Long categoryId);
}
