pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Clean up any previously running containers
                    sh 'docker rm -f react-app-test || true'
                    // Clean npm cache
                    sh 'npm cache clean --force'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build --no-cache -t my-app-image .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Start Docker container for the React app
                    sh 'docker run --rm -d -p 3001:3000 --name react-app-test my-app-image'
                    // Install dependencies and run tests
                    sh '''
                    npm install
                    npm install selenium-webdriver
                    node tests/selenium.test.js
                    '''
                    // Stop Docker container
                    sh 'docker stop react-app-test'
                }
            }
        }
    }
    post {
        always {
            // Cleanup Docker container
            sh 'docker rm -f react-app-test || true'
            // Archive artifacts and send email
            archiveArtifacts artifacts: '**/build/**, **/logs/**', allowEmptyArchive: true
            mail to: 'vidulattri2003@gmail.com', subject: 'Jenkins Build Notification', body: 'Build completed. Check for details.'
        }
    }
}
