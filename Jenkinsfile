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
                        // Set npm cache directory to within the Jenkins workspace
                        sh 'mkdir -p $WORKSPACE/.npm'
                        sh 'npm config set cache $WORKSPACE/.npm --global'

                        // Run npm install using this cache
                        sh 'npm install'

                        // Start the React app
                        sh 'npm start &'

                        // Run Selenium tests or other tests
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
