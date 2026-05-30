package com.bookstore.user.controller;

import com.bookstore.user.dto.AuthResponse;
import com.bookstore.user.dto.LoginRequest;
import com.bookstore.user.dto.RegisterRequest;
import com.bookstore.user.service.AuthService;
import com.bookstore.user.service.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validate(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        Claims claims = jwtService.parseToken(token);
        return ResponseEntity.ok(Map.of(
                "valid", true,
                "userId", claims.getSubject(),
                "email", claims.get("email", String.class),
                "role", claims.get("role", String.class)
        ));
    }

    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing Bearer token");
        }
        return authHeader.substring(7);
    }
}
