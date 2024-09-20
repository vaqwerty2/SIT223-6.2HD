pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
        SONAR_TOKEN = credentials('sqp_bbb8770d9688fc5818203cb52c34fa78dec1d572')
        NETLIFY_AUTH_TOKEN = credentials('nfp_2xu4UB8Tq2Xrk2J1YGJVXCxyoizM62Pj724f')  // Use the Jenkins credentials ID that stores your Netlify token
        SITE_ID = '7c3b9a75-b97e-4837-9ed0-f4f0860419d6'  // Your Netlify site ID
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

        stage('Release to Netlify') {
            steps {
                script {
                    // Ensure Netlify CLI is installed or use API call
                    sh """
                    echo 'Deploying to Netlify...'
                    npm run build
                    npx netlify deploy --dir=./build --prod --auth=${NETLIFY_AUTH_TOKEN} --site=${SITE_ID}
                    """
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
