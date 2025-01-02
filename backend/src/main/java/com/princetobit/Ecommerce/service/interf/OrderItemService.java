package com.princetobit.Ecommerce.service.interf;

import com.princetobit.Ecommerce.dto.OrderRequest;
import com.princetobit.Ecommerce.dto.Response;
import com.princetobit.Ecommerce.enums.OrderStatus;
import org.springframework.data.domain.Pageable;


import java.time.LocalDateTime;

public interface OrderItemService {

    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response filterOrderItems(OrderStatus orderStatus, LocalDateTime startDate , LocalDateTime endDate, Long itemId, Pageable pageable);

}
