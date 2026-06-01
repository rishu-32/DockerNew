# 🎓 BOOKSTORE MICROSERVICES PROJECT - VIVA QUESTIONS

---

## 📚 SECTION 1: BASIC/FUNDAMENTAL QUESTIONS

### 1. **What is this project about?**
**Expected Answer:** 
This is an Online Bookstore Application built using a microservices architecture. It demonstrates modern DevOps practices with automated CI/CD pipeline using Jenkins. The application is containerized with Docker and uses MongoDB for data persistence.

**Follow-up Questions:**
- Why did you choose microservices instead of monolithic?
- What are the main components?

---

### 2. **What are microservices and why are they beneficial?**
**Expected Answer:**
Microservices are small, independent services that work together. Each service handles a specific business function.

**Benefits:**
- Independent development and deployment
- Each service can scale separately
- Fault isolation (one service failure doesn't crash entire app)
- Technology flexibility (different services can use different tech)
- Easier to maintain and update
- Faster feature deployment

**Real-world Example:** Netflix uses microservices to handle millions of concurrent users independently.

---

### 3. **How many microservices do you have and what do they do?**
**Expected Answer:**
We have THREE microservices:

1. **User Service (Port 8081)**
   - User registration
   - Login functionality
   - JWT token generation
   - Authentication validation

2. **Book Service (Port 8082)**
   - CRUD operations on books
   - Search functionality
   - Book catalog management
   - Admin operations (add, update, delete books)

3. **Order Service (Port 8083)**
   - Shopping cart management
   - Order creation
   - Order history tracking
   - Order status management

---

### 4. **What is the role of Nginx in your project?**
**Expected Answer:**
Nginx acts as a **Reverse Proxy** and serves multiple purposes:

- **Entry Point:** Single entry point for all client requests on port 80
- **Routing:** Routes requests to appropriate microservices based on URL path:
  - `/api/users/*` → User Service (8081)
  - `/api/books/*` → Book Service (8082)
  - `/api/orders/*` → Order Service (8083)
  - `/` → Frontend static files
- **Load Balancing:** Can distribute load across multiple instances
- **Frontend Serving:** Serves React frontend application
- **Security:** Hides backend service details from clients

---

### 5. **What is Docker and why did you use it?**
**Expected Answer:**
Docker is a containerization technology that packages application code, dependencies, and runtime into isolated containers.

**Why we used Docker:**
- **Consistency:** Same environment on developer's machine, test server, and production
- **Portability:** "Works on my machine" problem is solved
- **Isolation:** Each service runs independently without affecting others
- **Scalability:** Easy to run multiple instances of same service
- **Efficiency:** Lightweight containers use fewer resources than VMs
- **DevOps:** Enables rapid deployment and scaling

**Real-world Use:** Amazon, Netflix, and Uber use Docker at massive scale.

---

### 6. **What is MongoDB and why NoSQL for this project?**
**Expected Answer:**
MongoDB is a **NoSQL (Not Only SQL) document database**.

**Why MongoDB instead of SQL:**
- **Flexible Schema:** Documents can have different structures
- **JSON-like Format:** Easy to map to Java objects
- **Scalability:** Horizontal scaling is easier
- **Speed:** No complex joins needed
- **Microservices Friendly:** Each service can have its own database design

**Our Setup:**
- Running on Docker container
- Port: 27018
- Database Name: bookstore
- Collections: users, books, orders

---

### 7. **What is JWT and how is it used in your project?**
**Expected Answer:**
**JWT (JSON Web Token)** is a stateless authentication method.

**How it works:**
1. User logs in with credentials
2. Server generates JWT token
3. Client stores token in browser
4. Client sends token with each request
5. Server validates token without database lookup

**Structure of JWT:**
```
Header.Payload.Signature
```

**Benefits:**
- Stateless (no session storage needed)
- Scalable (works across multiple servers)
- Secure (signed cryptographically)
- Cross-domain friendly (works with microservices)

**In our project:**
- User Service generates JWT on login
- Other services validate JWT
- Used for role-based access control (Admin vs User)

---

### 8. **What is Docker Compose and its role in your project?**
**Expected Answer:**
Docker Compose is a tool to **define and run multiple Docker containers** using a single YAML file.

**Our docker-compose.yml defines:**
- MongoDB service
- User Service
- Book Service
- Order Service
- Nginx service
- Networking between services
- Volume management
- Environment variables
- Port mappings

**Advantages:**
- Single command to start entire stack: `docker-compose up -d`
- Single command to stop everything: `docker-compose down`
- Automatic networking between containers
- Service dependency management (MongoDB starts before services)

---

### 9. **What ports does your application use and why?**
**Expected Answer:**

| Service | Port | Purpose |
|---------|------|---------|
| Nginx (Frontend) | 80 | Main application entry point |
| User Service API | 8081 | Authentication service |
| Book Service API | 8082 | Book management |
| Order Service API | 8083 | Order processing |
| MongoDB | 27018 | Database (internal: 27017) |

**Why different ports?**
- Port 80: Standard HTTP port for web browsers
- 8081-8083: Non-privileged ports for backend services
- 27018: Custom MongoDB port to avoid conflict with local MongoDB on 27017

---

### 10. **What is Jenkins and why is it important?**
**Expected Answer:**
Jenkins is a **CI/CD automation server** that automates the software development lifecycle.

**What does it do?**
- Monitors GitHub for code changes
- Automatically triggers builds
- Compiles code
- Runs tests
- Builds Docker images
- Deploys application
- Performs health checks

**Why important:**
- **Speed:** 90% reduction in deployment time (18 mins → 10 mins)
- **Consistency:** Same process every time
- **Reliability:** Eliminates human errors
- **Scalability:** Works with one service or hundred services

---

## 🔧 SECTION 2: INTERMEDIATE QUESTIONS

### 11. **Explain the Jenkins Pipeline stages in your project.**
**Expected Answer:**

**7 Stages in our Jenkinsfile:**

```
1. CHECKOUT (📥)
   - Pulls latest code from GitHub repository
   - Command: git checkout
   - Duration: 5 seconds

2. BUILD BACKEND SERVICES (🔨) - PARALLEL
   - Builds User Service → Maven compile & package
   - Builds Book Service → Maven compile & package
   - Builds Order Service → Maven compile & package
   - Runs in parallel for speed (2-3 minutes instead of 6-9)

3. BUILD FRONTEND (🎨)
   - npm install (dependencies)
   - npm run build (React compilation)
   - Duration: 1-2 minutes

4. BUILD DOCKER IMAGES (🐳)
   - Creates Docker images for all services
   - Command: docker-compose build
   - Duration: 2-3 minutes

5. STOP PREVIOUS DEPLOYMENT (🛑)
   - Stops old containers
   - Cleans up Docker resources
   - Command: docker-compose down -v && docker system prune -f
   - Duration: 30 seconds

6. DEPLOY APPLICATION (🚀)
   - Starts all containers with Docker Compose
   - Command: docker-compose up -d
   - Duration: 1 minute

7. HEALTH CHECK (✅)
   - Waits 30 seconds for stabilization
   - Runs curl health check
   - Verifies all containers running
   - Shows logs if failed
   - Duration: 1 minute
```

**Total Time:** 8-12 minutes (Fully Automated)
**Without Jenkins:** 18+ minutes + manual commands + errors

---

### 12. **How does communication happen between microservices?**
**Expected Answer:**

**In our project:**

1. **Through Nginx (for external requests):**
   - Client calls `http://localhost/api/books`
   - Nginx routes to `Book Service (8081)`
   - Response sent back to client

2. **Direct Service-to-Service (within containers):**
   - Services communicate using Docker service names
   - Example: User Service connects to `mongodb:27017` (Docker DNS resolves this)
   - Services are on same Docker network (bookstore-net)

3. **Asynchronous Communication (if implemented):**
   - Could use message queues (RabbitMQ, Kafka)
   - Currently using synchronous REST APIs

**Benefits of separation:**
- Independent deployment
- Service isolation
- Individual scaling
- Fault tolerance

---

### 13. **What happens if one microservice fails?**
**Expected Answer:**

**Scenario:** Book Service crashes

**What happens:**
1. **Nginx** immediately stops routing to Book Service
2. **User Service** can still register/login users
3. **Order Service** can still manage orders
4. Other users' requests are not affected
5. Only book-related operations fail gracefully

**How we handle this:**
- **Health Checks:** Jenkins verifies service is running
- **Container Restart:** Docker-Compose auto-restart on failure
- **Logging:** Collect logs to diagnose issue
- **Isolation:** Failure doesn't cascade to other services

**If entire system crashes:**
- All containers stop
- Jenkins triggers automatic restart
- Entire stack comes up again

**Comparison with Monolith:**
- If one bug in monolith → entire app crashes
- In microservices → only that service affected

---

### 14. **How do you handle authentication across multiple services?**
**Expected Answer:**

**3-Step Process:**

**Step 1: Login (User Service)**
```
Client POST /api/auth/login → User Service (8081)
                           → Generate JWT Token
                           ← Return JWT to client
```

**Step 2: Store Token**
```
Client stores JWT in localStorage/cookie
```

**Step 3: Use Token (Book Service or Order Service)**
```
Client requests /api/books
         Headers: Authorization: Bearer {JWT}
                  ↓
              Book Service validates JWT
                  ↓
              If valid → return books
              If invalid → return 401 Unauthorized
```

**Why JWT is perfect for microservices:**
- **Stateless:** No session storage needed on each service
- **Distributed:** Works across multiple services
- **Scalable:** No shared session database
- **Secure:** Cryptographically signed token

---

### 15. **Explain the Nginx routing configuration and why it's important.**
**Expected Answer:**

**Routing Rules in Nginx:**
```
GET http://localhost
  → Serves React frontend (index.html, CSS, JS)

GET/POST http://localhost/api/users/*
  → Routes to User Service (8081)

GET/POST http://localhost/api/books/*
  → Routes to Book Service (8082)

GET/POST http://localhost/api/orders/*
  → Routes to Order Service (8083)
```

**Why Nginx routing is important:**

1. **Single Entry Point:** Clients only know about port 80
2. **Service Abstraction:** Backend services hidden from clients
3. **Load Distribution:** Can add multiple instances per service
4. **Security:** Backend services not exposed directly
5. **SSL/TLS:** Can terminate HTTPS at Nginx layer
6. **Caching:** Can cache static files

**Real-world scenario:**
- If Book Service crashes → Nginx immediately shows error
- Client doesn't need to know Service port changed
- DevOps team can restart service without client knowing

---

### 16. **How do you scale individual services?**
**Expected Answer:**

**With Docker Compose, we can scale services:**

```bash
# Scale Book Service to 3 instances
docker-compose up -d --scale book-service=3

# This creates:
- book-service-1
- book-service-2  
- book-service-3
```

**Load Balancing:**
- Nginx automatically load-balances between instances
- Requests distributed round-robin
- If one instance fails, traffic goes to other instances

**When to scale:**
- **Book Service:** Many users browsing books → scale up
- **User Service:** Many registrations → scale up
- **Order Service:** Heavy order processing → scale up

**Monolith vs Microservices comparison:**
- **Monolith:** Need to scale entire application (wasteful)
- **Microservices:** Scale only the bottleneck service (efficient)

---

### 17. **What security measures are implemented in your project?**
**Expected Answer:**

**Security Measures:**

1. **Authentication (JWT)**
   - User must login to get token
   - Token required for all API calls
   - Stateless, can't forge easily

2. **Authorization (Role-based)**
   - Admin can create/edit/delete books
   - Regular users only browse and order
   - Server validates role on each request

3. **Password Security**
   - Should be hashed (bcrypt) in production
   - Not sent in responses

4. **HTTPS/SSL** (In Production)
   - All communication encrypted
   - Nginx can terminate SSL

5. **Network Isolation (Docker)**
   - Services on isolated Docker network
   - Only exposed ports are public
   - Internal services communicate securely

6. **Environment Variables**
   - JWT_SECRET stored in environment
   - Not hardcoded in source code
   - Can be changed without redeploying

7. **Database Access**
   - MongoDB on non-standard port
   - Only accessible from containers
   - Not exposed to internet

---

### 18. **How do you handle data persistence in Docker containers?**
**Expected Answer:**

**Problem:** Docker containers are ephemeral (temporary). When container stops, data is lost.

**Solution: Docker Volumes**

```yaml
# In docker-compose.yml
volumes:
  mongo_data:/data/db
```

**How it works:**
- Data is written to `mongo_data` volume (on host machine)
- When container stops → data persists
- When container restarts → data is still there
- Multiple containers can share volume

**In our project:**
- MongoDB uses volume `mongo_data`
- Even if container crashes → database data is safe
- Can backup/restore volume

**Without volumes:**
- All data would be lost when container stops
- Every restart would be fresh start
- Not suitable for production

---

### 19. **Explain the docker-compose.yml structure in your project.**
**Expected Answer:**

**Key Sections:**

```yaml
version: '3.8'          # Docker Compose file version

services:               # Define all containers
  mongodb:              # Database service
    image: mongo:7.0    # Official MongoDB image
    ports:
      - "27018:27017"   # External:Internal port mapping
    
  user-service:         # First backend service
    build:              # Build from Dockerfile
      context: ./user-service
    ports:
      - "8081:8081"
    environment:        # Environment variables for container
      MONGODB_URI: mongodb://mongodb:27017/bookstore
    depends_on:         # Wait for MongoDB to start first
      mongodb:
        condition: service_healthy

volumes:                # Persistent storage
  mongo_data:

networks:               # Docker network for service communication
  bookstore-net:
```

**Why this structure matters:**
- Clear definition of entire stack
- Single file to manage everything
- Reproducible setup
- Easy to modify

---

### 20. **How does Jenkinsfile handle failures and what happens next?**
**Expected Answer:**

**Jenkins post-build sections:**

```groovy
post {
    success {
        // If pipeline succeeds
        echo '✅ Pipeline completed successfully!'
        // Could send notification, update status board
    }
    
    failure {
        // If any stage fails
        echo '❌ Pipeline failed!'
        // Collect logs, notify team
        bat 'docker-compose logs --tail=100'
        // Could trigger rollback
    }
    
    always {
        // Runs whether success or failure
        cleanWs()  // Cleanup workspace
    }
}
```

**Failure Scenarios:**

1. **Maven build fails:**
   - Java compilation error
   - Test failure
   - Pipeline stops
   - Logs shown to developer

2. **Docker build fails:**
   - Dockerfile error
   - Image size too large
   - Pipeline stops

3. **Docker-compose up fails:**
   - Port already in use
   - Container won't start
   - Health check fails

4. **What happens next:**
   - Jenkins sends notification (email, Slack)
   - Developer gets alert
   - Can view logs immediately
   - Fix and recommit code
   - Pipeline runs again

---

## 🚀 SECTION 3: ADVANCED QUESTIONS

### 21. **How would you add another microservice to this project?**
**Expected Answer:**

**Steps:**

1. **Create new service folder** (e.g., `payment-service`)
   ```
   mkdir payment-service
   create pom.xml (Maven config)
   create Dockerfile
   create src/main/java/...
   create src/main/resources/application.yml
   ```

2. **Create Dockerfile**
   ```dockerfile
   FROM openjdk:21
   COPY target/payment-service.jar app.jar
   CMD ["java", "-jar", "app.jar"]
   ```

3. **Add to docker-compose.yml**
   ```yaml
   payment-service:
     build:
       context: ./payment-service
     ports:
       - "8084:8084"
     environment:
       SERVER_PORT: 8084
       MONGODB_URI: mongodb://mongodb:27017/bookstore
     depends_on:
       mongodb:
         condition: service_healthy
   ```

4. **Update Jenkinsfile**
   ```groovy
   stage('Build Payment Service') {
       steps {
           dir('payment-service') {
               bat 'mvn clean package -DskipTests'
           }
       }
   }
   ```

5. **Configure Nginx routing**
   ```nginx
   location /api/payments {
       proxy_pass http://payment-service:8084;
   }
   ```

6. **Integrate authentication & database**
   - Import JWT validation
   - Connect to MongoDB
   - Add API endpoints

7. **Test & deploy**
   - Git push
   - Jenkins pipeline triggers
   - New service deployed

---

### 22. **What would you do if a service needs to communicate with another service?**
**Expected Answer:**

**Scenario:** Order Service needs to call Book Service to check inventory

**Implementation:**

1. **Service-to-Service Communication:**
   ```java
   // In Order Service
   @RestTemplate
   public class BookServiceClient {
       public BookDto getBook(String bookId) {
           // Call Book Service using service name (Docker DNS)
           String url = "http://book-service:8082/api/books/" + bookId;
           return restTemplate.getForObject(url, BookDto.class);
       }
   }
   ```

2. **Key Points:**
   - Use service name (not localhost)
   - Docker DNS resolves service name to IP
   - Services must be on same Docker network
   - Add error handling for network failures

3. **Retry Logic:**
   ```java
   @Retry(maxAttempts = 3, delay = 1000)
   public BookDto getBook(String bookId) {
       // Retry if first call fails
   }
   ```

4. **Circuit Breaker Pattern:**
   ```java
   @CircuitBreaker(name = "bookService")
   public BookDto getBook(String bookId) {
       // Stop calling if service is down
       // Return cached data or error
   }
   ```

5. **Monitoring:**
   - Log each call
   - Track response times
   - Alert if service is slow/down

**Best Practice:** Avoid tight coupling between services. Use async messaging when possible.

---

### 23. **How would you implement database separation for each service?**
**Expected Answer:**

**Current Setup:** All services share one MongoDB database

**Better Approach:** Database per service (Microservices Best Practice)

```yaml
# docker-compose.yml

services:
  mongodb-users:
    image: mongo:7.0
    ports:
      - "27018:27017"
    environment:
      MONGO_INITDB_DATABASE: users_db

  mongodb-books:
    image: mongo:7.0
    ports:
      - "27019:27017"
    environment:
      MONGO_INITDB_DATABASE: books_db

  mongodb-orders:
    image: mongo:7.0
    ports:
      - "27020:27017"
    environment:
      MONGO_INITDB_DATABASE: orders_db

  user-service:
    environment:
      MONGODB_URI: mongodb://mongodb-users:27017/users_db

  book-service:
    environment:
      MONGODB_URI: mongodb://mongodb-books:27017/books_db

  order-service:
    environment:
      MONGODB_URI: mongodb://mongodb-orders:27017/orders_db
```

**Benefits:**
- **True Independence:** Each service owns its data
- **Scalability:** Can scale databases separately
- **Technology Freedom:** Could use different databases
- **Fault Isolation:** Database failure affects only one service

**Challenges:**
- **Data Consistency:** Harder to maintain ACID transactions across services
- **Complex Queries:** Can't join data across databases
- **Network Calls:** Need service-to-service communication for data access

---

### 24. **How would you implement logging and monitoring?**
**Expected Answer:**

**Logging Stack:**

```yaml
# docker-compose.yml additions

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    
  logstash:
    image: docker.elastic.co/logstash/logstash:8.0.0
    
  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"
```

**Setup in microservices:**

```java
// In Spring Boot application.yml
logging:
  level:
    root: INFO
  file:
    name: logs/application.log
  logback:
    rollingpolicy:
      max-file-size: 10MB
```

**Monitoring Metrics:**

```yaml
# Add Prometheus & Grafana
prometheus:
  image: prom/prometheus
  
grafana:
  image: grafana/grafana
  ports:
    - "3000:3000"
```

**What to monitor:**
- CPU usage per service
- Memory consumption
- Request response times
- Error rates
- Database query performance
- Container health

**Example Queries:**
- "Which service has highest error rate?"
- "Why is Order Service slow?"
- "When did service crash?"

---

### 25. **How would you handle database migration with microservices?**
**Expected Answer:**

**Challenge:** Database schemas change over time. How to update without downtime?

**Solution: Flyway/Liquibase Migration Tools**

```java
// Add to pom.xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
```

```yaml
# application.yml
spring:
  flyway:
    locations: classpath:db/migration
    baselineOnMigrate: true
```

**Migration File:**
```sql
-- V1__Create_books_table.sql
CREATE TABLE books (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  price DECIMAL(10, 2)
);

-- V2__Add_stock_column.sql
ALTER TABLE books ADD COLUMN stock INT DEFAULT 0;
```

**Process:**
1. Developer creates new migration file `V3__...sql`
2. Commits to Git
3. Jenkins builds
4. Flyway runs migrations before app starts
5. If migration fails, app doesn't start
6. Can rollback to previous version

**Best Practices:**
- Test migrations locally first
- Have rollback scripts ready
- Never lose data
- Run migrations during low-traffic times

---

### 26. **What is a potential bottleneck in your system and how to solve it?**
**Expected Answer:**

**Potential Bottlenecks:**

1. **Nginx becomes bottleneck**
   - Single point of failure
   - **Solution:** Load balance Nginx across multiple instances

2. **MongoDB becomes bottleneck**
   - All services query single database
   - **Solution:** Database per service, or MongoDB sharding

3. **Synchronous API calls**
   - Order Service waits for Book Service response
   - **Solution:** Async messaging with RabbitMQ/Kafka

4. **Network latency between services**
   - Service-to-service calls are slower than local calls
   - **Solution:** Caching, service mesh (Istio)

5. **Jenkins pipeline takes too long**
   - Tests take 20 minutes
   - **Solution:** Parallel test execution, skip tests in dev environment

6. **Docker image size too large**
   - Takes long to pull and start
   - **Solution:** Multi-stage builds, use smaller base images

**Recommended Solution for our project:**

```yaml
# Add Redis caching
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"

# Add message queue
rabbitmq:
  image: rabbitmq:3-management
  ports:
    - "5672:5672"
    - "15672:15672"
```

With caching and messaging:
- 90% faster responses
- Asynchronous processing
- Reduced database load

---

### 27. **How would you handle versioning of APIs?**
**Expected Answer:**

**Scenario:** Book Service API v1 is live. Need to add v2 with breaking changes.

**Approach 1: URL Versioning**
```
GET /api/v1/books        # Old API (v1)
GET /api/v2/books        # New API (v2)
```

**Implementation:**
```java
@RestController
@RequestMapping("/api")
public class BookController {
    
    @GetMapping("/v1/books")
    public List<BookDtoV1> getBooksV1() {
        // Old format
    }
    
    @GetMapping("/v2/books")
    public List<BookDtoV2> getBooksV2() {
        // New format with more fields
    }
}
```

**Approach 2: Header Versioning**
```
GET /api/books
Header: X-API-Version: 2
```

**Approach 3: Content Negotiation**
```
GET /api/books
Accept: application/vnd.bookstore.v2+json
```

**Pros & Cons:**

| Approach | Pros | Cons |
|----------|------|------|
| URL | Clear, easy to test | Many endpoints |
| Header | Clean URLs | Hidden complexity |
| Content Type | Standard practice | Confusing for browsers |

**Best Practice for Microservices:**
- Use URL versioning for clarity
- Maintain v1 for 6-12 months
- Deprecate old versions gradually
- Communicate deprecation well

---

### 28. **How would you test this microservices application?**
**Expected Answer:**

**Testing Pyramid:**

```
        /\
       /  \        E2E Tests (10%)
      /    \       - Postman/Selenium
     /------\      - Full workflow tests
    /        \
   /          \   Integration Tests (20%)
  /            \  - Service communication
 /              \ - Database tests
/________________\ Unit Tests (70%)
                   - JUnit, Mockito
                   - Individual methods
```

**Unit Tests:**
```java
@Test
public void testRegisterUser() {
    User user = userService.register("test@email.com", "password");
    assertNotNull(user);
    assertTrue(user.isActive());
}
```

**Integration Tests:**
```java
@Test
public void testUserServiceIntegration() {
    // Start MongoDB container
    // Call actual endpoints
    // Verify data in database
}
```

**E2E Tests:**
```bash
# Start entire docker-compose
docker-compose up

# Run test suite
pytest e2e_tests.py

# Tests:
# 1. Register user
# 2. Login
# 3. Browse books
# 4. Add to cart
# 5. Place order
# 6. Verify order in database
```

**Add to Jenkinsfile:**
```groovy
stage('Test') {
    steps {
        dir('user-service') {
            bat 'mvn test'
        }
        dir('book-service') {
            bat 'mvn test'
        }
        // Report coverage
    }
}
```

---

### 29. **How would you deploy this to production on AWS?**
**Expected Answer:**

**Current Setup:** Single machine with Docker Compose

**Production Setup:**

1. **Container Orchestration (Kubernetes)**
   ```yaml
   # Instead of Docker Compose, use K8s
   apiVersion: v1
   kind: Pod
   metadata:
     name: book-service
   spec:
     containers:
     - name: book-service
       image: myrepo/book-service:1.0
       ports:
       - containerPort: 8082
   ```

2. **AWS Services:**
   - **ECS/EKS:** Run containers
   - **RDS MongoDB Atlas:** Managed database
   - **ALB:** Load balancer (instead of Nginx)
   - **ECR:** Docker image registry
   - **CloudWatch:** Logging & monitoring
   - **Auto Scaling:** Scale based on demand

3. **Deployment Process:**
   ```
   GitHub Push
     → GitHub Actions (CI)
     → Build & test
     → Push to ECR
     → Trigger ECS deployment
     → Rolling update (blue-green deployment)
     → Health checks
     → Automatic rollback if fails
   ```

4. **Security:**
   - VPC (private network)
   - SSL/TLS certificates
   - Secrets manager for JWT_SECRET
   - IAM roles & policies

5. **Database:**
   - MongoDB Atlas cloud database
   - Automatic backups
   - Replication for high availability

**Cost:** $500-2000/month for full production setup

---

### 30. **Explain the complete request flow from user clicking "Place Order" to data stored in database.**
**Expected Answer:**

**User clicks "Place Order" button**

```
1. FRONTEND (React)
   └─ User clicks button
   └─ JavaScript calls:
      POST http://localhost/api/orders
      Headers: { Authorization: Bearer {JWT_TOKEN} }
      Body: { cartItems: [...], totalAmount: 599.99 }

2. NGINX (Port 80)
   └─ Receives POST request
   └─ Checks URL path: /api/orders
   └─ Routes to Order Service (Port 8083)

3. ORDER SERVICE (Spring Boot)
   └─ Receives request
   └─ Controller method: @PostMapping("/orders")
   └─ Validates JWT token
       └─ If invalid → Return 401 Unauthorized
   └─ Extracts user from JWT
   └─ Validate order data (required fields, amounts)
   └─ Call Book Service to verify book stock:
       GET http://book-service:8082/api/books/{bookId}
   └─ If not in stock → Return error
   └─ Save order to MongoDB:
       db.orders.insertOne({
         userId: "user123",
         items: [...],
         totalAmount: 599.99,
         status: "PENDING",
         createdAt: "2026-05-30T..."
       })
   └─ Return order ID & confirmation

4. RESPONSE BACK TO FRONTEND
   └─ HTTP 201 Created
   └─ Body: { orderId: "order123", status: "PENDING" }

5. FRONTEND
   └─ Receives response
   └─ Shows success message
   └─ Updates cart (empties it)
   └─ Redirects to order history

6. DATABASE
   └─ MongoDB stores order permanently
   └─ Can be queried later: GET /api/orders (to show order history)
```

**Key Points:**
- JWT token validates user identity
- Inter-service call to Book Service
- Database transaction logs order
- Response sent back through same chain

**If something fails:**
- MongoDB down → 500 error
- Book Service down → 503 Service Unavailable
- JWT invalid → 401 Unauthorized
- Validation error → 400 Bad Request

---

## 🎯 SECTION 4: SCENARIO-BASED QUESTIONS

### 31. **Your application is running, but the Order Service is not responding. How would you debug?**

**Step 1: Check if container is running**
```bash
docker ps | grep order-service
```

**Step 2: Check logs**
```bash
docker logs bookstore-order-service
# Look for Java exceptions, connection errors
```

**Step 3: Check if port is accessible**
```bash
curl http://localhost:8083/api/orders
# Should return response or error message
```

**Step 4: Check MongoDB connection**
```bash
docker exec bookstore-order-service curl http://mongodb:27017
# Verify MongoDB is reachable
```

**Step 5: Check environment variables**
```bash
docker inspect bookstore-order-service | grep MONGODB
# Verify MONGODB_URI is correct
```

**Step 6: Restart service**
```bash
docker-compose restart order-service
```

**Step 7: If still fails, rebuild and redeploy**
```bash
docker-compose up -d --build order-service
```

---

### 32. **A developer accidentally pushed a breaking change. How do you recover?**

**Immediate (In Jenkins):**
1. Check Jenkins build history
2. If build is running → Click "Stop Build"
3. If build succeeded but app broken → See below

**Recovery Steps:**

```bash
# 1. Check git history
git log --oneline

# 2. Revert the breaking commit
git revert <commit-hash>
git push

# 3. Jenkins automatically triggers with reverted code

# 4. Alternative: Rollback to previous image
docker-compose up --no-build  # Uses previous image

# 5. If database schema changed, needs careful handling
# Restore from backup if data corrupted
```

**Prevention:**
- Code review before merge
- Automated tests catch errors
- Staging environment before production
- Database migration scripts with rollback

---

### 33. **How would you add a new book category feature without downtime?**

**Process:**

1. **Database Migration (Blue-Green)**
   ```sql
   -- Migration V3__Add_category.sql
   ALTER TABLE books ADD COLUMN category VARCHAR(50) DEFAULT 'General';
   ```

2. **Code Development** (in feature branch)
   ```java
   // New BookController method
   @GetMapping("/api/books/category/{name}")
   public List<Book> getBooksByCategory(@PathVariable String name) { }
   ```

3. **Backward Compatibility**
   - Old clients still work (category optional)
   - New clients can use category filter

4. **Deployment**
   ```bash
   # Existing instances still running
   git push feature/categories
   
   # Jenkins builds new version
   docker build -t book-service:v2 .
   
   # Update docker-compose to point to v2
   # But don't restart yet
   
   # Rolling deployment (one by one)
   docker-compose up -d book-service  # Restart with new version
   
   # Old code still handling requests from other instances
   # Gradually all instances updated
   # No downtime!
   ```

---

### 34. **The entire system crashed due to MongoDB corruption. How to recover?**

**Recovery Plan:**

```bash
# 1. Take database backup first (always!)
docker exec bookstore-mongodb mongodump --out /backup

# 2. Stop all services
docker-compose down

# 3. If data is recoverable
docker-compose up -d mongodb

# 4. Restore from backup
docker exec bookstore-mongodb mongorestore /backup

# 5. If data is lost, start fresh
docker volume rm bookstore_mongo_data
docker-compose up -d

# 6. Verify data integrity
docker exec bookstore-mongodb mongosh bookstore --eval "db.books.count()"

# 7. Restart all services
docker-compose up -d
```

**Prevention:**
- Automated daily backups to S3/Google Cloud
- MongoDB replica sets for redundancy
- Monitoring and alerts for disk space
- Regular disaster recovery drills

---

### 35. **Your Book Service needs to return 1 million books list but its timing out. How to optimize?**

**Problem:** Large data set causes timeout

**Solutions:**

1. **Pagination**
   ```java
   @GetMapping("/api/books")
   public Page<Book> getBooks(
       @RequestParam(defaultValue = "0") int page,
       @RequestParam(defaultValue = "20") int size
   ) {
       return bookService.findAll(PageRequest.of(page, size));
   }
   ```

2. **Caching**
   ```java
   @Cacheable("books")
   public List<Book> getAllBooks() { }
   ```

3. **Database Indexing**
   ```java
   // In MongoDB
   db.books.createIndex({ "title": 1 })
   db.books.createIndex({ "author": 1 })
   ```

4. **Search/Filter**
   ```
   GET /api/books?category=Fiction&minPrice=10&maxPrice=50
   // Return only matching books
   ```

5. **Async Processing**
   - If export needed → Background job
   - Return download link via email

6. **CDN for static data**
   - Cache popular books in Redis
   - Return from cache if fresh

**Result:**
- Pagination: 100ms (20 books)
- Cached: 10ms
- Without optimization: 30s+ timeout

---

## ✅ ANSWER EVALUATION CRITERIA

When a student answers viva questions, evaluate on:

1. **Correctness** - Is the technical information accurate?
2. **Completeness** - Did they cover all important aspects?
3. **Clarity** - Can non-technical people understand?
4. **Depth** - Do they understand internal workings?
5. **Real-world thinking** - Can they relate to actual scenarios?
6. **Problem-solving** - Can they debug and optimize?

---

## 🎯 EXPECTED ANSWER STRUCTURE

**Good Answer Format:**

```
CONCEPT: [What is being asked]
EXPLANATION: [What it does]
HOW IT WORKS: [Step-by-step process]
WHY IT'S IMPORTANT: [Business value]
REAL-WORLD EXAMPLE: [Relates to Netflix/Amazon/Uber]
COMPARISON: [vs Alternative approach]
CODE EXAMPLE: [If applicable]
```

---

## 📝 TIPS FOR PRESENTING ANSWERS

1. **Start with simple explanation**, then go deeper
2. **Use analogies** (reverse proxy = post office)
3. **Draw diagrams** if possible
4. **Show code snippets** for technical questions
5. **Admit if you don't know**, but explain how you'd find out
6. **Ask clarifying questions** - "Do you want detailed architecture?"
7. **Connect to other technologies** - "Similar to Netflix..."

---

## 🏆 SCORE INTERPRETATION

**18-20 Questions Answered Well:** Excellent understanding
**15-17 Questions:** Good understanding
**12-14 Questions:** Fair understanding
**<12 Questions:** Needs more study

---

Good luck with your viva! 🎓
