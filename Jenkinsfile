pipeline {
    agent any
    stages {
        stage ("Build Backend"){
            steps{
                script {
                    sh "pwd"
                    echo "INFO: Building NodeJS Docker Image"
                    dir('Backend'){
                        sh "pwd"
                        sh "docker build . -t swe-node-web-app"    
                    }
                    echo "INFO: Docker Image built"
                }
            }
        }
        stage ("Deploy Backend"){
            steps{
                script {
                    echo "INFO: Running new Docker image"
                    sh "docker rm -f swe-node-web-app || true"
                    sh "docker run --restart always -p 3001:3001 -d --name swe-node-web-app swe-node-web-app:latest"
                     echo "INFO: Deployed Backend"
                }
            }
        }
        stage ("Build Frontend"){
            steps{
                script {
                    sh "pwd"
                    echo "INFO: Building React Frontend Docker Image"
                    dir('Backend'){
                        echo"CHANGED VERZEICHNIS"
                        sh "pwd"
                        sh "docker build -t swe-react-nginx ."    
                    }
                    echo "INFO: Docker Build Frontend Image built"
                }
            }
        }
        stage ("Deploy Frontend"){
            steps{
                script {
                    echo "INFO: Running new Docker image"
                    sh "docker rm -f swe-react-nginx || true"
                    sh "docker run --restart always -p 80:4200 -d --name swe-react-nginx swe-react-nginx:latest"
                     echo "INFO: Deployed Frontend"
                }
            }
        }
    }
}