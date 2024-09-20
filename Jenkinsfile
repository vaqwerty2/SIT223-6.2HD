pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
        SONAR_TOKEN = credentials('sqp_bbb8770d9688fc5818203cb52c34fa78dec1d572')
    }

    tools {
        // Ensure your Maven or any other required tool is configured here if needed for SonarQube or other stages
        maven 'M3' // Example placeholder for Maven, ensure it matches Jenkins configuration
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
                    // Ensure that Node.js environment has all dependencies such as chromedriver and selenium-webdriver
                    sh 'node tests/selenium.test.js' // Run the Node.js Selenium test
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('jenkinshd') { // Ensure 'SonarQube' is the correct configured name in Jenkins
                    sh "mvn sonar:sonar -Dsonar.projectKey=jenkinshd -Dsonar.projectName=jenkinshd -Dsonar.host.url=http://localhost:9000 -Dsonar.login=${env.SONAR_TOKEN}"
                    // Ensure Maven command is correctly pointing to your project specifics and SonarQube configuration
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Additional deployment steps go here
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
