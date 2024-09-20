pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
        SONAR_TOKEN = credentials('sqp_bbb8770d9688fc5818203cb52c34fa78dec1d572')
        OCTOPUS_CLI_SERVER_ID = 'https://jjenkinshd.octopus.app' // Use the Octopus server ID configured in Jenkins
        OCTOPUS_PROJECT_NAME = 'jenkins' // Your Octopus project name
        OCTOPUS_CLI_API_KEY = credentials('API-WQI9L08JU4WVYYNFJCOV9VSV2LONIH75') // Use the correct credentials ID for your Octopus API key
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
                sh 'docker-compose down'  // Stop any running containers
                sh 'docker-compose up -d' // Start the containers in detached mode
            }
        }

        stage('Release') {
            steps {
                script {
                    octopusCreateRelease additionalArgs: '--releaseNumber=${BUILD_NUMBER}', octopusDeployServerId: env.OCTOPUS_CLI_SERVER_ID, projectName: env.OCTOPUS_PROJECT_NAME
                    octopusDeployRelease additionalArgs: '--deployTo=Production', octopusDeployServerId: env.OCTOPUS_CLI_SERVER_ID, projectName: env.OCTOPUS_PROJECT_NAME, releaseNumber: '${BUILD_NUMBER}'
                }
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
