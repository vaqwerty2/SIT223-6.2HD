pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Clean up any previously running containers
                    sh 'docker rm -f react-app-test || true'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t my-app-image .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run the React app in a Docker container
                    sh 'docker run --rm -d -p 3001:3000 --name react-app-test my-app-image'
                    // Install Selenium WebDriver if necessary
                    sh 'npm install selenium-webdriver'
                    // Run the Selenium test
                    sh 'node tests/selenium.test.js'
                    // Optional: Stop the Docker container after tests
                    sh 'docker stop react-app-test'
                }
            }
        }
    }
    post {
        always {
            // Clean up
            sh 'docker rm -f react-app-test || true'
            // Archive artifacts and logs
            archiveArtifacts artifacts: '**/build/**, **/logs/**', allowEmptyArchive: true
            // Send email notification
            mail to: 'vidulattri2003@gmail.com', subject: 'Jenkins Build Notification', body: 'Build completed. Check for details.'
        }
    }
}
