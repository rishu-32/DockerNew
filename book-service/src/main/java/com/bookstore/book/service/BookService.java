package com.bookstore.book.service;

import com.bookstore.book.dto.BookRequest;
import com.bookstore.book.model.Book;
import com.bookstore.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(String id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    }

    public List<Book> searchBooks(String query) {
        if (query == null || query.isBlank()) {
            return bookRepository.findAll();
        }
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }

    public Book createBook(BookRequest request) {
        Book book = mapToBook(new Book(), request);
        return bookRepository.save(book);
    }

    public Book updateBook(String id, BookRequest request) {
        Book existing = getBookById(id);
        Book updated = mapToBook(existing, request);
        return bookRepository.save(updated);
    }

    public void deleteBook(String id) {
        if (!bookRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
        }
        bookRepository.deleteById(id);
    }

    private Book mapToBook(Book book, BookRequest request) {
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setCategory(request.getCategory());
        book.setDescription(request.getDescription());
        book.setImageUrl(request.getImageUrl());
        book.setPrice(request.getPrice());
        book.setStock(request.getStock());
        return book;
    }
}
