pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
        SONAR_TOKEN = credentials('sqp_bbb8770d9688fc5818203cb52c34fa78dec1d572')
    }

    tools {
        maven 'M3' // Ensure Maven is installed
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Selenium tests...'
                sh 'node tests/selenium.test.js'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('jenkinshd') {
                    sh "mvn sonar:sonar -Dsonar.projectKey=jenkinshd -Dsonar.projectName=jenkinshd -Dsonar.host.url=http://localhost:9000 -Dsonar.login=${env.SONAR_TOKEN}"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying with Docker Compose...'
                // Run docker-compose to deploy the application
                sh 'docker-compose down'  // Stop any running containers
                sh 'docker-compose up -d' // Start the containers in detached mode
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
