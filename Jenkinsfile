pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'my-react-app'
        SONAR_TOKEN = credentials('sqp_bbb8770d9688fc5818203cb52c34fa78dec1d572')
        NETLIFY_AUTH_TOKEN = credentials('nfp_2xu4UB8Tq2Xrk2J1YGJVXCxyoizM62Pj724f')
        SITE_ID = '7c3b9a75-b97e-4837-9ed0-f4f0860419d6'
        DATADOG_API_KEY = credentials('dcab34841849af57f9a8a66bfef7a717') // Jenkins credential ID for Datadog API key
    }

    tools {
        maven 'M3'
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
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }

        stage('Release to Netlify') {
            steps {
                script {
                    echo 'Deploying to Netlify...'
                    sh "npm run build"
                    sh "npx netlify deploy --dir=./build --prod --auth=${NETLIFY_AUTH_TOKEN} --site=${SITE_ID}"
                }
            }
        }

        stage('Monitor with Datadog') {
            steps {
                script {
                    sh """
                    echo 'Sending data to Datadog...'
                    curl -X POST -H "Content-type: application/json" -d '{
                        "title": "Deployment completed for ${DOCKER_IMAGE}",
                        "text": "Deployment done at \$(date)",
                        "priority": "normal",
                        "tags": ["environment:production", "project:jenkinshd"],
                        "alert_type": "info"
                    }' 'https://api.datadoghq.com/api/v1/events?api_key=${DATADOG_API_KEY}'
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
        }
        success {
            emailext (
                to: 'vidulattri2003@gmail.com',
                subject: "SUCCESS: Build #${BUILD_NUMBER}",
                body: "Hi,\n\nThe build was successful. Please find the attached log.",
                attachmentsPattern: "**/build.log"
            )
        }
        failure {
            emailext (
                to: 'vidulattri2003@gmail.com',
                subject: "FAILURE: Build #${BUILD_NUMBER}",
                body: "Hi,\n\nThe build failed. Please find the attached log.",
                attachmentsPattern: "**/build.log"
            )
        }
    }
}