pipeline {
    agent any

    environment {
        DOCKER_USER = "vigneshawss"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Vignesh-Kds/MRM.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t $DOCKER_USER/mrm-backend:$IMAGE_TAG ./mrmpg-backend
                docker build -t $DOCKER_USER/mrm-admin:$IMAGE_TAG ./mrmpg-admin
                docker build -t $DOCKER_USER/mrm-user:$IMAGE_TAG ./mrmpg-user
                docker build -t $DOCKER_USER/mrm-member:$IMAGE_TAG ./mrmpg-member
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin

                    docker push $DOCKER_USER/mrm-backend:$IMAGE_TAG
                    docker push $DOCKER_USER/mrm-admin:$IMAGE_TAG
                    docker push $DOCKER_USER/mrm-user:$IMAGE_TAG
                    docker push $DOCKER_USER/mrm-member:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                    kubectl apply -f mrm-k8s.yaml

                    kubectl rollout restart deployment backend
                    kubectl rollout restart deployment admin
                    kubectl rollout restart deployment user
                    kubectl rollout restart deployment member
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
