package com.bookstore.order.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemRequest {

    @NotBlank
    private String bookId;

    @NotBlank
    private String title;

    @NotNull
    private BigDecimal price;

    @NotNull
    @Min(1)
    private Integer quantity;
}
