# Jenkins Setup Guide for BookStore Project

## 📋 Prerequisites
- Windows machine
- Docker Desktop installed and running
- Git installed
- Java 21 installed
- Maven installed
- Node.js 20 installed

---

## 🚀 Part 1: Install Jenkins

### Option 1: Using Docker (Easiest)

1. **Pull and run Jenkins container:**
```bash
docker run -d -p 8080:8080 -p 50000:50000 ^
  -v jenkins_home:/var/jenkins_home ^
  -v /var/run/docker.sock:/var/run/docker.sock ^
  --name jenkins ^
  jenkins/jenkins:lts
```

2. **Get initial admin password:**
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### Option 2: Direct Installation on Windows

1. Download Jenkins from: https://www.jenkins.io/download/
2. Run the `.msi` installer
3. Follow installation wizard
4. Jenkins will start automatically on port 8080

---

## 🔧 Part 2: Initial Jenkins Configuration

### Step 1: Access Jenkins
1. Open browser: http://localhost:8080
2. Enter the initial admin password (from above)
3. Click **Continue**

### Step 2: Install Plugins
1. Select **Install suggested plugins**
2. Wait for installation to complete
3. Additionally install these plugins:
   - Go to **Manage Jenkins** → **Plugins** → **Available plugins**
   - Search and install:
     - ✅ Docker Pipeline
     - ✅ Docker
     - ✅ Maven Integration
     - ✅ NodeJS Plugin
     - ✅ Git Plugin
     - ✅ Pipeline

### Step 3: Create Admin User
1. Fill in the form:
   - Username: `admin`
   - Password: (your choice)
   - Full name: (your name)
   - Email: (your email)
2. Click **Save and Continue**
3. Keep default Jenkins URL
4. Click **Start using Jenkins**

---

## ⚙️ Part 3: Configure Jenkins Tools

### Step 1: Configure Maven
1. Go to **Manage Jenkins** → **Tools**
2. Scroll to **Maven installations**
3. Click **Add Maven**
   - Name: `Maven-3.9`
   - ✅ Install automatically
   - Version: Select latest 3.9.x
4. Click **Save**

### Step 2: Configure JDK
1. In **Tools** page, scroll to **JDK installations**
2. Click **Add JDK**
   - Name: `JDK-21`
   - ✅ Install automatically
   - Version: Select Java 21
3. Click **Save**

### Step 3: Configure NodeJS
1. In **Tools** page, scroll to **NodeJS installations**
2. Click **Add NodeJS**
   - Name: `NodeJS-20`
   - ✅ Install automatically
   - Version: Select 20.x
3. Click **Save**

---

## 🔐 Part 4: Create Credentials

### Step 1: Add JWT Secret
1. Go to **Manage Jenkins** → **Credentials**
2. Click on **(global)** domain
3. Click **Add Credentials**
4. Fill in:
   - Kind: **Secret text**
   - Scope: **Global**
   - Secret: `bookstore-devops-jwt-secret-key-2026-min-32-chars`
   - ID: `bookstore-jwt-secret`
   - Description: `JWT Secret for BookStore`
5. Click **Create**

### Step 2: Add Git Credentials (if private repo)
1. Click **Add Credentials** again
2. Fill in:
   - Kind: **Username with password**
   - Username: (your git username)
   - Password: (your git password/token)
   - ID: `git-credentials`
   - Description: `Git Repository Access`
3. Click **Create**

---

## 📦 Part 5: Create Jenkins Pipeline Job

### Step 1: Create New Job
1. From Jenkins dashboard, click **New Item**
2. Enter item name: `bookstore-pipeline`
3. Select **Pipeline**
4. Click **OK**

### Step 2: Configure Pipeline
1. **General Section:**
   - Description: `BookStore Microservices CI/CD Pipeline`
   - ✅ Discard old builds (keep last 10 builds)

2. **Build Triggers:**
   - ✅ Poll SCM
   - Schedule: `H/5 * * * *` (checks every 5 minutes)

3. **Pipeline Section:**
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: (your repository URL)
     - Example: `https://github.com/yourusername/bookstore-project.git`
   - Credentials: Select if private repo
   - Branch Specifier: `*/main` (or `*/master`)
   - Script Path: `Jenkinsfile`

4. Click **Save**

---

## ▶️ Part 6: Run Your First Build

### Step 1: Trigger Build
1. Go to your pipeline: `bookstore-pipeline`
2. Click **Build Now**
3. Watch the build progress in **Build History**

### Step 2: View Console Output
1. Click on the build number (e.g., #1)
2. Click **Console Output**
3. Watch the pipeline stages execute

### Step 3: Verify Deployment
After successful build:
```bash
# Check running containers
docker ps

# Access application
# Open browser: http://localhost

# Check API
curl http://localhost/api/books
```

---

## 🎯 Part 7: Understanding the Pipeline

Your Jenkinsfile has these stages:

1. **Checkout** - Gets code from Git repository
2. **Build Backend Services** - Builds all 3 microservices in parallel
   - User Service (Maven)
   - Book Service (Maven)
   - Order Service (Maven)
3. **Build Frontend** - Builds React frontend with npm
4. **Build Docker Images** - Creates Docker images for all services
5. **Stop Previous Deployment** - Stops old containers
6. **Deploy Application** - Starts new containers with docker-compose
7. **Health Check** - Verifies application is running

---

## 📊 Part 8: View Pipeline Visualization

1. Go to your pipeline job
2. Click on a build number
3. Click **Pipeline Steps** or **Pipeline Overview**
4. See visual representation of stages

---

## 🔄 Part 9: Automatic Builds (Optional)

### Option A: GitHub Webhook
1. Go to your GitHub repository
2. Settings → Webhooks → Add webhook
3. Payload URL: `http://your-jenkins-ip:8080/github-webhook/`
4. Content type: `application/json`
5. Select: **Just the push event**
6. Click **Add webhook**

### Option B: GitLab Webhook
1. Go to your GitLab repository
2. Settings → Webhooks
3. URL: `http://your-jenkins-ip:8080/project/bookstore-pipeline`
4. Trigger: **Push events**
5. Click **Add webhook**

---

## 🐛 Troubleshooting

### Issue 1: Maven not found
**Solution:** Go to **Manage Jenkins** → **Tools** and configure Maven

### Issue 2: Docker commands fail
**Solution:** Ensure Docker Desktop is running and Jenkins has access

### Issue 3: Port already in use
**Solution:** Stop existing containers:
```bash
docker-compose down
```

### Issue 4: Permission denied
**Solution:** Run Jenkins with admin privileges or add user to docker group

### Issue 5: Build fails at npm install
**Solution:** Clear npm cache:
```bash
cd frontend
npm cache clean --force
npm install
```

---

## 📝 What to Submit to Your Teacher

1. **Screenshots:**
   - ✅ Jenkins dashboard with your pipeline
   - ✅ Successful build with all green stages
   - ✅ Console output showing build process
   - ✅ Running application (http://localhost)
   - ✅ Docker containers running (`docker ps`)

2. **Files:**
   - ✅ Jenkinsfile (already created)
   - ✅ This setup documentation

3. **Demonstration:**
   - Show Jenkins pipeline execution
   - Show automatic build trigger (push code → Jenkins builds)
   - Show deployed application working

---

## 🎓 Key Concepts to Explain

1. **CI/CD Pipeline:** Automated process from code to deployment
2. **Jenkins Stages:** Sequential steps in the pipeline
3. **Parallel Execution:** Building multiple services simultaneously
4. **Docker Integration:** Building and deploying with containers
5. **Health Checks:** Verifying deployment success

---

## 📚 Additional Resources

- Jenkins Documentation: https://www.jenkins.io/doc/
- Pipeline Syntax: https://www.jenkins.io/doc/book/pipeline/syntax/
- Docker Integration: https://www.jenkins.io/doc/book/pipeline/docker/

---

## ✅ Success Criteria

Your Jenkins setup is complete when:
- ✅ Jenkins is running on http://localhost:8080
- ✅ Pipeline job is created and configured
- ✅ Build executes successfully (all stages green)
- ✅ Application deploys and runs on http://localhost
- ✅ You can trigger builds manually and automatically

---

**Good luck with your project! 🚀**
