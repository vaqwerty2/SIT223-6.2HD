pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build('my-app-image')
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    docker.image('my-app-image').inside {
                        // Ensure dependencies are installed
                        sh 'npm install'
                        // Run Selenium tests
                        sh 'node tests/selenium.test.js'
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
