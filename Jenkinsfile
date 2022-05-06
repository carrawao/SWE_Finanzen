pipeline {
    agent any
    stages {
        stage ("Build"){
            steps{
                script {
                    sh "pwd"
                    echo "INFO: Building NodeJS Docker Image"
                    dir('Backend'){
                        echo"CHANGED VERZEICHNIS"
                        sh "pwd"
                        sh "docker build . -t swe/node-web-app"    
                    }
                    echo "INFO: Docker Image built"
                }
            }
        }
        stage ("Deploy"){
            steps{
                script {
                    echo "INFO: Running new Docker image"
                    sh "docker rm -f swe/node-web-app || true"
                    sh "docker run --restart always -p 3001:3001 -d swe/node-web-app"
                     echo "INFO: Deployed"
                }
            }
        }
    }
}