package com.princetobit.Ecommerce.dto;

import lombok.Data;

@Data
public class OrderItemRequest {
    private int productId;
    private int quantity;
}
