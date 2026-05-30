package com.bookstore.user.config;

import com.bookstore.user.model.User;
import com.bookstore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@bookstore.com")) {
            userRepository.save(User.builder()
                    .email("admin@bookstore.com")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("Store Admin")
                    .role("ADMIN")
                    .build());
        }

        if (!userRepository.existsByEmail("user@bookstore.com")) {
            userRepository.save(User.builder()
                    .email("user@bookstore.com")
                    .password(passwordEncoder.encode("user123"))
                    .fullName("Demo User")
                    .role("USER")
                    .build());
        }
    }
}
