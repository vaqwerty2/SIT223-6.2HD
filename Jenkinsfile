pipeline {
    agent any

    stages {
        stage('Preparation') {
            steps {
                script {
                    // Clean up previous Docker containers if they exist
                    sh "docker rm -f react-app-test || true"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build Docker image from Dockerfile in the project directory
                    sh "docker build -t my-app-image ."
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run the application in a new Docker container
                    sh "docker run --rm -d -p 3001:3000 --name react-app-test my-app-image"

                    // Install Selenium WebDriver if it's not included in package.json
                    sh "npm install selenium-webdriver"

                    // Execute tests
                    sh "node tests/selenium.test.js"

                    // Optionally, stop the Docker container after tests
                    sh "docker stop react-app-test"
                }
            }
        }
    }

    post {
        always {
            // Archive test results and other artifacts
            archiveArtifacts artifacts: '**/target/surefire-reports/*.xml', allowEmptyArchive: true

            // Send an email notification regardless of the build result
            emailext(
                to: 'vidulattri2003@gmail.com',
                subject: 'Jenkins Build Notification - ${BUILD_STATUS}',
                body: """<p>Build Completed - ${BUILD_STATUS}: ${BUILD_URL}</p>"""
            )
        }
        cleanup {
            // Clean up the Docker container forcefully after the build is done
            script {
                sh "docker rm -f react-app-test || true"
            }
        }
    }
}
