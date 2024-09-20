pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
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
                script {
                    // Assuming you have `chromedriver` and `selenium-webdriver` set up in the project
                    sh 'node tests/selenium.test.js' // Run the Node.js Selenium test
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
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
