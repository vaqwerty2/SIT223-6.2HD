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
                        // Optional: Set npm to use a custom cache directory within the workspace
                        sh 'npm config set cache $WORKSPACE/.npm --global'
                        sh 'npm install'
                        // Run Selenium tests or other commands here
                    }
                }
            }
        }
    }

    post {
        always {
            // Collect artifacts or logs if needed
            // Assuming logs are saved in a known directory
            archiveArtifacts artifacts: 'logs/**', fingerprint: true

            // Send email notification with logs
            emailext(
              subject: "Build ${env.BUILD_NUMBER} Status",
              body: """<p>Build ${env.BUILD_NUMBER} completed.</p>
                       <p>Status: ${currentBuild.currentResult}</p>
                       <p>See attached logs for more details.</p>""",
              attachLog: true,
              to: 'vidulattri2003@gmail.com'
            )
        }
    }
}