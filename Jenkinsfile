pipeline {
    agent any
    stages {
        stage ( "Build"){
            steps{
                script {
                    echo "INFO: Building NodeJS Docker Image"
                    sh "sudo docker build . -t swe/node-web-app"
                    echo "INFO: Docker Image built"
                }
            }
        }
        stage ("Deploy"){
            steps{
                script {
                    echo "INFO: Running new Docker image"
                    sh "docker rm -f swe/node-web-app || true"
                    sh "docker run --restart always -D 3001:3001 - d -name swe/node-web-app swe/node-web-app:latest"
                     echo "INFO: Deployed"
                }
            }
        }
    }
}