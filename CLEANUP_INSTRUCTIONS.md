# 🧹 Manual Cleanup Instructions

## Run these commands BEFORE triggering Jenkins build:

### Step 1: Navigate to project directory
```cmd
cd "c:\Users\RISHU PANDEY\OneDrive\Desktop\DES02\newdevops\bookstore-project"
```

### Step 2: Stop and remove all containers with volumes
```cmd
docker-compose down -v
```

### Step 3: Remove any dangling containers (if needed)
```cmd
docker container prune -f
```

### Step 4: Verify no containers are running
```cmd
docker ps -a
```
You should see NO bookstore containers listed.

### Step 5: Clean up Docker system (optional but recommended)
```cmd
docker system prune -f
```

---

## After cleanup, commit and push the updated Jenkinsfile:

```cmd
git add Jenkinsfile
git commit -m "Fix Jenkins cleanup stage for Windows"
git push origin main
```

---

## Then trigger Jenkins build:

1. Go to Jenkins: http://localhost:8080
2. Click on "bookstore-pipeline"
3. Click "Build Now"
4. Watch the build progress in "Console Output"

---

## Expected Result:

✅ All stages should pass:
- Checkout
- Build Backend Services (User, Book, Order)
- Build Frontend
- Build Docker Images
- Stop Previous Deployment
- Deploy Application
- Health Check

✅ Application running at: http://localhost

✅ Check running containers:
```cmd
docker ps
```

You should see 6 containers running:
- bookstore-mongodb
- bookstore-user-service
- bookstore-book-service
- bookstore-order-service
- bookstore-frontend-build (may exit after copying files)
- bookstore-nginx
