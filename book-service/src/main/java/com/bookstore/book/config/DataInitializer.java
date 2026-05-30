package com.bookstore.book.config;

import com.bookstore.book.model.Book;
import com.bookstore.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BookRepository bookRepository;

    @Override
    public void run(String... args) {
        List<Book> catalog = List.of(
                book("Clean Code", "Robert C. Martin", "Technology",
                        "A handbook of agile software craftsmanship.",
                        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", "39.99", 25),
                book("The Pragmatic Programmer", "David Thomas", "Technology",
                        "Your journey to mastery in software development.",
                        "https://images.unsplash.com/photo-1495446815901-a72907e220ab?w=400", "34.50", 18),
                book("Atomic Habits", "James Clear", "Self Help",
                        "Tiny changes, remarkable results for everyday life.",
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", "18.99", 40),
                book("Deep Work", "Cal Newport", "Productivity",
                        "Rules for focused success in a distracted world.",
                        "https://images.unsplash.com/photo-1524995997942-a1c2e315a42f?w=400", "22.00", 30),
                book("Design Patterns", "Erich Gamma", "Technology",
                        "Elements of reusable object-oriented software.",
                        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400", "49.99", 12),
                book("The Alchemist", "Paulo Coelho", "Fiction",
                        "A magical story about following your dream.",
                        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400", "14.99", 50),
                book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction",
                        "A portrait of the Jazz Age in all of its decadence and excess.",
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400", "12.99", 35),
                book("Sapiens", "Yuval Noah Harari", "History",
                        "A brief history of humankind from ancient times to today.",
                        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400", "24.99", 28),
                book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "Fantasy",
                        "The boy who lived begins his journey at Hogwarts.",
                        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400", "19.99", 60),
                book("A Brief History of Time", "Stephen Hawking", "Science",
                        "From the Big Bang to black holes — cosmology for everyone.",
                        "https://images.unsplash.com/photo-1532012197267-da84d127e023?w=400", "16.50", 22),
                book("The Art of War", "Sun Tzu", "Philosophy",
                        "Ancient Chinese military strategy still applied to business and life.",
                        "https://images.unsplash.com/photo-1506880018603-83a5f81a013f?w=400", "9.99", 45),
                book("Steve Jobs", "Walter Isaacson", "Biography",
                        "The exclusive biography of the Apple co-founder.",
                        "https://images.unsplash.com/photo-1456513080740-7dd21470f879?w=400", "21.00", 20),
                book("The Lean Startup", "Eric Ries", "Business",
                        "How entrepreneurs use continuous innovation to build companies.",
                        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400", "27.50", 15)
        );

        for (Book seed : catalog) {
            boolean exists = bookRepository.findAll().stream()
                    .anyMatch(b -> b.getTitle().equalsIgnoreCase(seed.getTitle()));
            if (!exists) {
                bookRepository.save(seed);
            }
        }
    }

    private Book book(String title, String author, String category, String description,
                      String imageUrl, String price, int stock) {
        return Book.builder()
                .title(title)
                .author(author)
                .category(category)
                .description(description)
                .imageUrl(imageUrl)
                .price(new BigDecimal(price))
                .stock(stock)
                .build();
    }
}
