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

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add commands to run your tests here
            }
        }

        stage('Push Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub_credentials') {
                        docker.image(env.DOCKER_IMAGE).push("${env.BUILD_NUMBER}")
                        docker.image(env.DOCKER_IMAGE).push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying...'
                // Add your deployment scripts here
            }
        }
    }
}
