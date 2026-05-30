# 🔧 Jenkins Pipeline Troubleshooting Guide

## Common Issues and Solutions

### ❌ Issue 1: "Container name already in use"
**Error**: `The container name '/bookstore-mongodb' is already in use`

**Solution**:
```cmd
cd "c:\Users\RISHU PANDEY\OneDrive\Desktop\DES02\newdevops\bookstore-project"
docker-compose down -v
docker container prune -f
```

---

### ❌ Issue 2: Docker Desktop not running
**Error**: `error during connect: This error may indicate that the docker daemon is not running`

**Solution**:
1. Open Docker Desktop application
2. Wait for it to fully start (whale icon in system tray should be steady)
3. Retry Jenkins build

---

### ❌ Issue 3: Port already in use
**Error**: `Bind for 0.0.0.0:80 failed: port is already allocated`

**Solution**:
```cmd
# Check what's using port 80
netstat -ano | findstr :80

# Stop the process or change docker-compose.yml ports
# For example, change nginx port from "80:80" to "8080:80"
```

---

### ❌ Issue 4: Maven build fails
**Error**: `Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin`

**Solution**:
- Verify JDK-21 is configured in Jenkins (Manage Jenkins → Tools)
- Check pom.xml has correct Java version (21)
- Ensure Lombok version is 1.18.38 or higher

---

### ❌ Issue 5: Health check fails
**Error**: `curl: (7) Failed to connect to localhost port 80`

**Solution**:
1. Check if containers are running:
```cmd
docker ps
```

2. Check container logs:
```cmd
docker-compose logs user-service
docker-compose logs book-service
docker-compose logs order-service
docker-compose logs nginx
```

3. Wait longer (services may need more time to start)

---

### ❌ Issue 6: Frontend build fails
**Error**: `npm ERR! code ELIFECYCLE`

**Solution**:
1. Verify NodeJS-20 is configured in Jenkins
2. Check if node_modules exists and is not corrupted
3. Try manual build:
```cmd
cd frontend
npm install
npm run build
```

---

## 🔍 Debugging Commands

### Check Jenkins workspace
```cmd
cd C:\ProgramData\Jenkins\.jenkins\workspace\bookstore-pipeline
dir
```

### View all Docker containers (including stopped)
```cmd
docker ps -a
```

### View Docker images
```cmd
docker images
```

### View Docker volumes
```cmd
docker volume ls
```

### Remove all stopped containers
```cmd
docker container prune -f
```

### Remove all unused images
```cmd
docker image prune -a -f
```

### View Docker Compose logs
```cmd
docker-compose logs --tail=100
```

### Follow logs in real-time
```cmd
docker-compose logs -f
```

---

## 📸 Screenshots for Teacher Submission

Take screenshots of:

1. **Jenkins Dashboard**
   - URL: http://localhost:8080
   - Show the bookstore-pipeline job

2. **Successful Build**
   - Click on the successful build number (e.g., #5)
   - Show the "Stage View" with all green checkmarks

3. **Console Output**
   - Click "Console Output"
   - Scroll to show the success message

4. **Running Containers**
   - Open cmd and run: `docker ps`
   - Screenshot showing all 6 containers running

5. **Application in Browser**
   - URL: http://localhost
   - Show the bookstore frontend working

6. **Docker Compose Status**
   - Run: `docker-compose ps`
   - Screenshot showing all services "Up"

---

## ✅ Verification Checklist

Before submitting to teacher:

- [ ] Jenkins is running on http://localhost:8080
- [ ] Pipeline job "bookstore-pipeline" exists
- [ ] Latest build shows SUCCESS (green checkmark)
- [ ] All 6 Docker containers are running (`docker ps`)
- [ ] Application accessible at http://localhost
- [ ] Can register a user on the frontend
- [ ] Can login with registered user
- [ ] Can view books list
- [ ] All screenshots captured
- [ ] Jenkinsfile is in GitHub repository
- [ ] README_JENKINS.md explains the setup

---

## 🆘 Still Having Issues?

1. Check Jenkins console output for exact error message
2. Check Docker Desktop is running
3. Verify all tools configured in Jenkins (Maven, JDK, NodeJS)
4. Ensure JWT secret credential is set
5. Make sure GitHub repository URL is correct in pipeline configuration
