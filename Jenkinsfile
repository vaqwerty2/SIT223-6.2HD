pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Remove existing Docker containers safely
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
                    // Run the Docker container
                    sh 'docker run --rm -d -p 3001:3000 --name react-app-test my-app-image'
                    // Here, integrate your actual test commands or scripts
                    sh 'echo "Run tests here"'
                    // Optionally stop the Docker container if needed
                    sh 'docker stop react-app-test'
                }
            }
        }
    }

    post {
        always {
            // Cleanup actions like archiving artifacts
            archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
            mail to: 'vidulattri2003@gmail.com', subject: 'Build Finished', body: "Check the build results in Jenkins."
            // Ensure Docker containers are cleaned up properly
            script {
                sh 'docker rm -f react-app-test || true'
            }
        }
    }
}
