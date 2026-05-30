package com.bookstore.order.controller;

import com.bookstore.order.model.Order;
import com.bookstore.order.service.CartOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final CartOrderService cartOrderService;

    @PostMapping
    public ResponseEntity<Order> placeOrder(Authentication authentication) {
        return ResponseEntity.ok(cartOrderService.placeOrder(authentication.getName()));
    }

    @GetMapping("/history")
    public ResponseEntity<List<Order>> orderHistory(Authentication authentication) {
        return ResponseEntity.ok(cartOrderService.getOrderHistory(authentication.getName()));
    }
}
