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
                    // Start the React app in the Docker container
                    docker.image('my-app-image').inside {
                        // Set npm to use a custom cache directory within the workspace
                        sh 'npm config set cache $WORKSPACE/.npm --global'
                        
                        // Install dependencies
                        sh 'npm install'

                        // Start the React app in the background
                        sh 'npm start &'

                        // Wait for the app to be up (you may need to adjust the wait time)
                        sleep 10

                        // Run the Selenium tests against the running app
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
