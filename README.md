# Online BookStore — DevOps Microservices Project

A production-style online bookstore built with **React**, **Spring Boot (Java 21)**, **MongoDB**, **Docker**, and **GitHub Actions CI/CD**.

## Architecture

```
Developer Push Code
        ↓
GitHub Trigger Event
        ↓
GitHub Actions Pipeline
        ↓
Maven Build
        ↓
Docker Image Build
        ↓
Docker Compose Deployment
        ↓
Application Running
```

### Microservices

| Service        | Port | Responsibilities                          |
|----------------|------|-------------------------------------------|
| user-service   | 8081 | Registration, login, JWT authentication   |
| book-service   | 8082 | CRUD books, search, list                  |
| order-service  | 8083 | Cart, place orders, order history         |

### Docker Images

1. **Custom Dockerfile** — Spring Boot microservices (user, book, order)
2. **MongoDB** — `mongo:7.0` from Docker Hub
3. **Nginx** — `nginx:1.25-alpine` from Docker Hub (reverse proxy + static frontend)

## Quick Start

### Prerequisites

- Java 21, Maven 3.9+
- Node.js 20+
- Docker & Docker Compose

### Run with Docker Compose

```bash
cd bookstore-project
docker compose up --build -d
```

Open **http://localhost**

### One-command start (Windows)

```powershell
cd bookstore-project
.\scripts\start.ps1
```

### MongoDB Compass

Your PC may already have MongoDB on port **27017**. This project uses Docker MongoDB on port **27018** so both can run together.

| Setting | Value |
|---------|--------|
| Connection string | `mongodb://localhost:27018/bookstore` |
| Database | `bookstore` |
| Collections | `users`, `books`, `orders` |

In Compass: **New Connection** → paste the URI above → **Connect** → open **bookstore**.

### Demo Accounts

| Role  | Email                 | Password  |
|-------|-----------------------|-----------|
| Admin | admin@bookstore.com   | admin123  |
| User  | user@bookstore.com    | user123   |

## API Endpoints

### User Service (`/api/auth`)

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/validate`

### Book Service (`/api/books`)

- `GET /api/books` — list all
- `GET /api/books/search?q=` — search
- `GET /api/books/{id}` — details
- `POST /api/books` — create (ADMIN)
- `PUT /api/books/{id}` — update (ADMIN)
- `DELETE /api/books/{id}` — delete (ADMIN)

### Order Service

- `GET /api/cart`
- `POST /api/cart/items`
- `DELETE /api/cart/items/{bookId}`
- `POST /api/orders`
- `GET /api/orders/history`

## Ports

| Service | URL / Port |
|---------|------------|
| Website (Nginx) | http://localhost |
| user-service | http://localhost:8081 |
| book-service | http://localhost:8082 |
| order-service | http://localhost:8083 |
| MongoDB (Compass) | `mongodb://localhost:27018` |

## Local Development (without Docker)

```bash
# Option A: use Docker MongoDB only
docker compose up mongodb -d
# Compass: mongodb://localhost:27018/bookstore

# Option B: local MongoDB on port 27017

# Terminal 1
cd user-service && mvn spring-boot:run

# Terminal 2
cd book-service && mvn spring-boot:run

# Terminal 3
cd order-service && mvn spring-boot:run

# Terminal 4
cd frontend && npm install && npm run dev
```

## CI/CD

GitHub Actions workflow: `.github/workflows/main.yml`

On every push to `main`/`master`:

1. Sets up Java 21
2. Runs Maven builds for all microservices
3. Builds frontend
4. Builds Docker images
5. Runs `docker compose up -d`
6. Performs health check

## Project Structure

```
bookstore-project/
├── frontend/
├── user-service/
├── book-service/
├── order-service/
├── docker-compose.yml
├── nginx/
└── .github/workflows/
```
