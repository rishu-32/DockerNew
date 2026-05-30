package com.bookstore.order.service;

import com.bookstore.order.dto.CartItemRequest;
import com.bookstore.order.model.Order;
import com.bookstore.order.model.OrderItem;
import com.bookstore.order.model.OrderStatus;
import com.bookstore.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartOrderService {

    private final OrderRepository orderRepository;

    public Order getCart(String userId) {
        return orderRepository.findByUserIdAndStatus(userId, OrderStatus.CART)
                .orElseGet(() -> createEmptyCart(userId));
    }

    public Order addToCart(String userId, CartItemRequest request) {
        Order cart = getCart(userId);
        List<OrderItem> items = new ArrayList<>(cart.getItems());

        Optional<OrderItem> existing = items.stream()
                .filter(item -> item.getBookId().equals(request.getBookId()))
                .findFirst();

        if (existing.isPresent()) {
            OrderItem item = existing.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
        } else {
            items.add(OrderItem.builder()
                    .bookId(request.getBookId())
                    .title(request.getTitle())
                    .price(request.getPrice())
                    .quantity(request.getQuantity())
                    .build());
        }

        cart.setItems(items);
        cart.setTotalAmount(calculateTotal(items));
        cart.setUpdatedAt(Instant.now());
        return orderRepository.save(cart);
    }

    public Order removeFromCart(String userId, String bookId) {
        Order cart = getCart(userId);
        List<OrderItem> items = cart.getItems().stream()
                .filter(item -> !item.getBookId().equals(bookId))
                .toList();

        cart.setItems(new ArrayList<>(items));
        cart.setTotalAmount(calculateTotal(items));
        cart.setUpdatedAt(Instant.now());
        return orderRepository.save(cart);
    }

    public Order clearCart(String userId) {
        Order cart = getCart(userId);
        cart.setItems(new ArrayList<>());
        cart.setTotalAmount(BigDecimal.ZERO);
        cart.setUpdatedAt(Instant.now());
        return orderRepository.save(cart);
    }

    public Order placeOrder(String userId) {
        Order cart = getCart(userId);
        if (cart.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty");
        }

        cart.setStatus(OrderStatus.PLACED);
        cart.setUpdatedAt(Instant.now());
        Order placed = orderRepository.save(cart);

        createEmptyCart(userId);
        return placed;
    }

    public List<Order> getOrderHistory(String userId) {
        return orderRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, OrderStatus.PLACED);
    }

    private Order createEmptyCart(String userId) {
        Instant now = Instant.now();
        Order cart = Order.builder()
                .userId(userId)
                .status(OrderStatus.CART)
                .items(new ArrayList<>())
                .totalAmount(BigDecimal.ZERO)
                .createdAt(now)
                .updatedAt(now)
                .build();
        return orderRepository.save(cart);
    }

    private BigDecimal calculateTotal(List<OrderItem> items) {
        return items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
