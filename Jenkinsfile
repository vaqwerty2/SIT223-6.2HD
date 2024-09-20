pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Attempt to remove the existing Docker container if it exists
                    sh 'docker rm -f react-app-test || true'
                    // Clean npm cache forcefully
                    sh 'npm cache clean --force'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Remove existing node_modules and package-lock.json
                    sh 'rm -rf node_modules package-lock.json'
                    // Docker build with no cache to ensure fresh layers
                    sh 'docker build --no-cache -t my-app-image .'
                }
            }
        }
    //     stage('Test') {
    //         steps {
    //             script {
    //                 // Run the Docker container
    //                 sh 'docker run --rm -d -p 3001:3000 --name react-app-test my-app-image'
    //                 // Install npm dependencies and run tests
    //                 sh '''
    //                 npm install
    //                 node tests/selenium.test.js
    //                 '''
    //                 // Stop and remove the Docker container
    //                 sh 'docker stop react-app-test'
    //             }
    //         }
    //     }
    // }
    // post {
    //     always {
    //         // Clean up Docker container regardless of build success or failure
    //         sh 'docker rm -f react-app-test || true'
    //         // Archive artifacts
    //         archiveArtifacts artifacts: '**/build/**, **/logs/**', allowEmptyArchive: true
    //         // Send a build notification email
    //         mail to: 'vidulattri2003@gmail.com', subject: 'Jenkins Build Notification', body: 'The build has been completed. Please check the details.'
    //     }
    // }
}
