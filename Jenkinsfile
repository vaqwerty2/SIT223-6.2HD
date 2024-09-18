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
                        // Create a local npm cache directory within Jenkins workspace
                        sh 'mkdir -p $WORKSPACE/.npm'
                        
                        // Install dependencies without setting global npm config
                        sh 'npm install'

                        // Start the React app in the background
                        sh 'npm start &'

                        // Run Selenium or other tests
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
