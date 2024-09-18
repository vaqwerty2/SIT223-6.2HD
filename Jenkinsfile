pipeline {
    agent any  // This tells Jenkins to run the pipeline on any available agent

    stages {
        stage('Build') {
            steps {
                script {
                    // Building the Docker image from the Dockerfile in the same directory
                    docker.build('my-app-image')
                }
            }
        }
    }
}
