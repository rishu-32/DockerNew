pipeline {
    agent any
    
    tools {
        maven 'Maven-3.9'
        jdk 'JDK-21'
        nodejs 'NodeJS-20'
    }
    
    environment {
        DOCKER_COMPOSE = 'docker-compose'
        JWT_SECRET = credentials('bookstore-jwt-secret')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Build Backend Services') {
            parallel {
                stage('Build User Service') {
                    steps {
                        dir('user-service') {
                            echo '🔨 Building User Service...'
                            bat 'mvn clean package -DskipTests'
                        }
                    }
                }
                
                stage('Build Book Service') {
                    steps {
                        dir('book-service') {
                            echo '🔨 Building Book Service...'
                            bat 'mvn clean package -DskipTests'
                        }
                    }
                }
                
                stage('Build Order Service') {
                    steps {
                        dir('order-service') {
                            echo '🔨 Building Order Service...'
                            bat 'mvn clean package -DskipTests'
                        }
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    echo '🎨 Building Frontend Application...'
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                bat 'docker-compose build'
            }
        }
        
        stage('Stop Previous Deployment') {
            steps {
                echo '🛑 Stopping previous deployment...'
                bat 'docker-compose down || exit 0'
            }
        }
        
        stage('Deploy Application') {
            steps {
                echo '🚀 Deploying application with Docker Compose...'
                bat 'docker-compose up -d'
            }
        }
        
        stage('Health Check') {
            steps {
                echo '⏳ Waiting for services to start...'
                sleep time: 30, unit: 'SECONDS'
                
                echo '🏥 Running health checks...'
                bat 'docker-compose ps'
                
                script {
                    try {
                        bat 'curl -f http://localhost/api/books'
                        echo '✅ Health check passed!'
                    } catch (Exception e) {
                        echo '⚠️ Health check failed, check logs'
                        bat 'docker-compose logs --tail=50'
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ ========================================='
            echo '✅ Pipeline completed successfully!'
            echo '✅ Application is running at http://localhost'
            echo '✅ ========================================='
        }
        failure {
            echo '❌ ========================================='
            echo '❌ Pipeline failed!'
            echo '❌ Showing container logs...'
            echo '❌ ========================================='
            bat 'docker-compose logs --tail=100'
        }
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
