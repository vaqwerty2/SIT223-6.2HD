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
            // Start the React app in Docker container
            sh 'docker run --rm -d -p 3001:3000 --name react-app-test my-app-image'

            // Install Selenium WebDriver if not already in package.json
            sh 'npm install selenium-webdriver'

            // Run the Selenium test
            sh 'node tests/selenium.test.js'

            // Optional: Stop the Docker container after tests
            sh 'docker stop react-app-test'
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
