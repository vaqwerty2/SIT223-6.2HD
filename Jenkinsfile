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
                    // Start the React app in the Docker container and run the tests
                    docker.image('my-app-image').inside {
                        // Fix permission issue by setting npm cache inside the workspace
                        sh 'npm config set cache $WORKSPACE/.npm --global'

                        // Install dependencies
                        sh 'npm install'

                        // Start the React app in the background on port 3001
                        sh 'PORT=3001 npm start &'

                        // Wait for the React app to start (adjust the time if needed)
                        sleep 15

                        // Run the Selenium tests against the app running at http://localhost:3001
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
