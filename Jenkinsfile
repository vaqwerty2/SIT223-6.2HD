pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    docker.build('my-app-image')
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Use Docker to run the container
                    docker.image('my-app-image').inside {
                        // Set npm to use a custom cache directory
                        sh 'npm config set cache $WORKSPACE/.npm --global'

                        // Install the required npm dependencies
                        sh 'npm install'

                        // Run the Selenium tests
                        sh 'node tests/selenium.test.js'
                    }
                }
            }
        }
    }

    post {
        always {
            // Archive artifacts and send notifications
            archiveArtifacts artifacts: '**/test-results/*.xml', fingerprint: true
            emailext(
                to: 'vidulattri2003@gmail.com',
                subject: "Build Status: ${currentBuild.fullDisplayName}",
                body: "Build ${currentBuild.fullDisplayName} finished with status: ${currentBuild.currentResult}. Check details at: ${env.BUILD_URL}"
            )
        }
    }
}
