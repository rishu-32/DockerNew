# BookStore Project - Jenkins CI/CD Implementation

## 🎯 Project Overview
This project demonstrates a complete CI/CD pipeline using Jenkins for a microservices-based bookstore application.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    Push Code to Git
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Jenkins Pipeline                        │
├─────────────────────────────────────────────────────────────┤
│  1. Checkout Code from Repository                           │
│  2. Build Backend Services (Maven)                           │
│     ├── User Service                                         │
│     ├── Book Service                                         │
│     └── Order Service                                        │
│  3. Build Frontend (npm)                                     │
│  4. Build Docker Images                                      │
│  5. Deploy with Docker Compose                               │
│  6. Health Check                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Running Application                        │
├─────────────────────────────────────────────────────────────┤
│  • MongoDB (Database)                                        │
│  • User Service (Port 8081)                                  │
│  • Book Service (Port 8082)                                  │
│  • Order Service (Port 8083)                                 │
│  • Frontend (React)                                          │
│  • Nginx (Port 80)                                           │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
bookstore-project/
├── Jenkinsfile                 # Jenkins pipeline definition
├── JENKINS_SETUP.md           # Detailed setup instructions
├── docker-compose.yml         # Docker orchestration
├── user-service/              # User microservice (Java/Spring Boot)
├── book-service/              # Book microservice (Java/Spring Boot)
├── order-service/             # Order microservice (Java/Spring Boot)
├── frontend/                  # React frontend
└── nginx/                     # Nginx reverse proxy config
```

## 🚀 Quick Start

### Prerequisites
- Windows OS
- Docker Desktop
- Java 21
- Maven 3.9+
- Node.js 20+
- Git

### Installation Steps

1. **Install Jenkins:**
```bash
docker run -d -p 8080:8080 -p 50000:50000 ^
  -v jenkins_home:/var/jenkins_home ^
  --name jenkins jenkins/jenkins:lts
```

2. **Access Jenkins:**
- Open: http://localhost:8080
- Get password: `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`

3. **Configure Jenkins:**
- Install required plugins (Maven, NodeJS, Docker, Pipeline)
- Configure tools (Maven-3.9, JDK-21, NodeJS-20)
- Add JWT secret credential

4. **Create Pipeline Job:**
- New Item → Pipeline
- Configure Git repository
- Point to Jenkinsfile
- Save and Build

5. **Access Application:**
- Frontend: http://localhost
- User Service: http://localhost:8081
- Book Service: http://localhost:8082
- Order Service: http://localhost:8083

## 🔧 Jenkins Pipeline Stages

### 1. Checkout
Clones the repository from Git

### 2. Build Backend Services (Parallel)
- Builds User Service with Maven
- Builds Book Service with Maven
- Builds Order Service with Maven

### 3. Build Frontend
- Installs npm dependencies
- Builds React application

### 4. Build Docker Images
- Creates Docker images for all services
- Uses docker-compose build

### 5. Stop Previous Deployment
- Stops and removes old containers

### 6. Deploy Application
- Starts all services with docker-compose
- Includes MongoDB, microservices, frontend, and Nginx

### 7. Health Check
- Waits for services to start
- Verifies API endpoints are responding

## 📊 Technologies Used

### Backend
- **Language:** Java 21
- **Framework:** Spring Boot 3.2.5
- **Build Tool:** Maven
- **Database:** MongoDB
- **Security:** JWT Authentication

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

### DevOps
- **CI/CD:** Jenkins
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Reverse Proxy:** Nginx
- **Version Control:** Git

## 🔐 Security

- JWT-based authentication
- Secure credential management in Jenkins
- Environment variable configuration
- CORS configuration for API access

## 📈 CI/CD Benefits

1. **Automated Builds:** No manual compilation needed
2. **Consistent Deployment:** Same process every time
3. **Fast Feedback:** Know immediately if build fails
4. **Parallel Execution:** Faster build times
5. **Easy Rollback:** Previous builds are tracked
6. **Continuous Integration:** Integrate code changes frequently

## 🧪 Testing the Pipeline

### Manual Trigger
1. Go to Jenkins dashboard
2. Click on `bookstore-pipeline`
3. Click **Build Now**
4. Watch the stages execute

### Automatic Trigger
1. Make a code change
2. Commit and push to repository
3. Jenkins automatically detects and builds

### Verify Deployment
```bash
# Check containers
docker ps

# Test API
curl http://localhost/api/books

# View logs
docker-compose logs -f
```

## 📸 Screenshots to Capture

For your teacher/submission:

1. Jenkins Dashboard with pipeline
2. Successful build (all stages green)
3. Console output showing build process
4. Pipeline visualization
5. Running containers (`docker ps`)
6. Application in browser (http://localhost)
7. API response from services

## 🐛 Common Issues & Solutions

### Issue: Maven not found
**Solution:** Configure Maven in Jenkins Tools

### Issue: Docker permission denied
**Solution:** Ensure Docker Desktop is running

### Issue: Port 8080 already in use
**Solution:** Stop conflicting service or change Jenkins port

### Issue: Build fails at npm install
**Solution:** Clear npm cache and retry

## 📝 Deliverables for Teacher

1. ✅ Working Jenkins installation
2. ✅ Configured pipeline job
3. ✅ Successful build execution
4. ✅ Running application
5. ✅ Documentation (this file + JENKINS_SETUP.md)
6. ✅ Screenshots of working system
7. ✅ Demonstration of CI/CD process

## 🎓 Learning Outcomes

After completing this project, you will understand:

- How to set up Jenkins on Windows
- How to create declarative Jenkins pipelines
- How to integrate Maven builds in Jenkins
- How to build Node.js applications in Jenkins
- How to use Docker in Jenkins pipelines
- How to deploy multi-container applications
- How to implement health checks
- How to configure automatic builds
- How to manage credentials securely
- How to troubleshoot CI/CD issues

## 📚 References

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Docker in Jenkins](https://www.jenkins.io/doc/book/pipeline/docker/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)

## 👨‍💻 Author

**Student Project - DevOps Implementation**

## 📄 License

Educational Project - For Learning Purposes

---

**For detailed setup instructions, see [JENKINS_SETUP.md](./JENKINS_SETUP.md)**
