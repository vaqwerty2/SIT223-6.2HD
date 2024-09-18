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
                        // Change ownership of the npm cache directory and use it within the workspace
                        sh 'mkdir -p $WORKSPACE/.npm'
                        sh 'npm config set cache $WORKSPACE/.npm --global'

                        // Run npm install (ensure permissions are correct)
                        sh 'npm install'

                        // Start the React app
                        sh 'npm start &'

                        // Run Selenium tests or any other tests
                        sh 'node tests/selenium.test.js'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/test-results.xml', allowEmptyArchive: true
            emailext to: 'vidulattri2003@gmail.com',
                     subject: 'Jenkins Build Completed',
                     body: 'Check the Jenkins build results.'
        }
    }
}
