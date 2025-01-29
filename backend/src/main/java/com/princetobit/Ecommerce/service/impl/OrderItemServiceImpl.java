package com.princetobit.Ecommerce.service.impl;

import com.princetobit.Ecommerce.dto.OrderItemDto;
import com.princetobit.Ecommerce.dto.OrderRequest;
import com.princetobit.Ecommerce.dto.Response;
import com.princetobit.Ecommerce.entity.Order;
import com.princetobit.Ecommerce.entity.OrderItem;
import com.princetobit.Ecommerce.entity.Product;
import com.princetobit.Ecommerce.entity.User;
import com.princetobit.Ecommerce.enums.OrderStatus;
import com.princetobit.Ecommerce.exception.NotFoundException;
import com.princetobit.Ecommerce.mapper.EntityDtoMapper;
import com.princetobit.Ecommerce.repository.OrderItemRepo;
import com.princetobit.Ecommerce.repository.OrderRepo;
import com.princetobit.Ecommerce.repository.ProductRepo;
import com.princetobit.Ecommerce.service.interf.OrderItemService;
import com.princetobit.Ecommerce.service.interf.UserService;
import com.princetobit.Ecommerce.specification.OrderItemSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepo orderItemRepo;
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;
    private final UserService userService;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response placeOrder(OrderRequest orderRequest) {
        User user = userService.getLoginUser();
        // map orderequest items to order items

        List<OrderItem> orderItems = orderRequest.getItems().stream().map(orderItemRequest -> {
            Product product = productRepo.findById(orderItemRequest.getProductId())
                    .orElseThrow(() -> new NotFoundException("Product not found!"));
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemRequest.getQuantity());
            orderItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(orderItemRequest.getQuantity())));///Setting the price according to the quantity
            orderItem.setStatus(OrderStatus.PENDING);
            orderItem.setUser(user);
            return orderItem;
        }).collect(Collectors.toList());
        //calculate the total price
        BigDecimal totalPrice = orderRequest.getTotalPrice() != null && orderRequest.getTotalPrice().compareTo(BigDecimal.ZERO) > 0
                ? orderRequest.getTotalPrice()
                : orderItems.stream().map(OrderItem::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);
        //create order entity
        Order order = new Order();
        order.setOrderItemList(orderItems);
        order.setTotalPrice(totalPrice);

        //set the order reference in each orderitem
        orderItems.forEach(orderItem -> orderItem.setOrder(order));

        orderRepo.save(order);
        return Response.builder()
                .status(200)
                .message("Order Placed Successfully")
                .build();
    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {
        OrderItem orderItem = orderItemRepo.findById(orderItemId)
                .orElseThrow(() -> new NotFoundException("Order item not found"));

        orderItem.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        orderItemRepo.save(orderItem);

        return Response.builder()
                .status(200)
                .message("Order status was updated Successfully")
                .build();
    }

    @Override
    public Response filterOrderItems(OrderStatus orderStatus, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable) {
        Specification<OrderItem> spec = Specification.where(OrderItemSpecification.hasStatus(orderStatus))
                .and(OrderItemSpecification.createdBetween(startDate, endDate))
                .and(OrderItemSpecification.hasItemId(itemId));

        Page<OrderItem> orderItemPage = orderItemRepo.findAll(spec,pageable);

        if (orderItemPage.isEmpty()) {
            throw new NotFoundException("No Order found");
        }
        List<OrderItemDto> orderItemDtos = orderItemPage.getContent().stream()
                .map(entityDtoMapper::mapOrderItemToDtoPlusProductAndUser)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .orderItemList(orderItemDtos)
                .totalPage(orderItemPage.getTotalPages())
                .totalElement(orderItemPage.getTotalElements())
                .build();
    }
}
