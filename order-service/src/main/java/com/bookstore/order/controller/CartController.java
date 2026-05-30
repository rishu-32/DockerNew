package com.bookstore.order.controller;

import com.bookstore.order.dto.CartItemRequest;
import com.bookstore.order.model.Order;
import com.bookstore.order.service.CartOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartOrderService cartOrderService;

    @GetMapping
    public ResponseEntity<Order> getCart(Authentication authentication) {
        return ResponseEntity.ok(cartOrderService.getCart(authentication.getName()));
    }

    @PostMapping("/items")
    public ResponseEntity<Order> addItem(Authentication authentication, @Valid @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(cartOrderService.addToCart(authentication.getName(), request));
    }

    @DeleteMapping("/items/{bookId}")
    public ResponseEntity<Order> removeItem(Authentication authentication, @PathVariable String bookId) {
        return ResponseEntity.ok(cartOrderService.removeFromCart(authentication.getName(), bookId));
    }

    @DeleteMapping
    public ResponseEntity<Order> clearCart(Authentication authentication) {
        return ResponseEntity.ok(cartOrderService.clearCart(authentication.getName()));
    }
}
