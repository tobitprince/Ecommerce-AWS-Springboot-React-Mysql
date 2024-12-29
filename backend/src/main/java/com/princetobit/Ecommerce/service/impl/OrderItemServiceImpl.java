package com.princetobit.Ecommerce.service.impl;

import com.princetobit.Ecommerce.dto.OrderRequest;
import com.princetobit.Ecommerce.dto.Response;
import com.princetobit.Ecommerce.enums.OrderStatus;
import com.princetobit.Ecommerce.service.interf.OrderItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemServiceImpl implements OrderItemService {

    
    @Override
    public Response placeOrder(OrderRequest orderRequest) {
        return null;
    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {
        return null;
    }

    @Override
    public Response filterOrderItems(OrderStatus orderStatus, LocalDateTime startDate, LocalDateTime endTime, Long itemId, Pageable pageable) {
        return null;
    }
}
