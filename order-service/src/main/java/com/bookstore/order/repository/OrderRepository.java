package com.bookstore.order.repository;

import com.bookstore.order.model.Order;
import com.bookstore.order.model.OrderStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {

    Optional<Order> findByUserIdAndStatus(String userId, OrderStatus status);

    List<Order> findByUserIdAndStatusOrderByCreatedAtDesc(String userId, OrderStatus status);
}
