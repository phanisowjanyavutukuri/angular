pipeline {
  options {
    disableConcurrentBuilds()
  }
  agent {
    kubernetes {
      label "angular"
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    application: "angular"
  ci: true
spec:
  containers:
  - name: docker-dind
    image: gcr.io/cloudwms-195710/docker-in-docker-with-git-gcloud
    command:  ["sh"]
    args: ["-c","dockerd --host=unix:///var/run/docker.sock --host=tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock "]
    tty: true 
    securityContext:
      privileged: true
    
  - name: kubectl
    image: gcr.io/cloudwms-195710/gcloud-kubectl-git
    imagePullPolicy: Always
    env:
    - name: SECRET_USERNAME
      valueFrom:
        secretKeyRef:
          name: mysecret
          key: kubernetes-username
    - name: SECRET_PASSWORD
      valueFrom:
        secretKeyRef:
          name: mysecret
          key: kubernetes-password
    tty: true
    securityContext:
      privileged: true
  imagePullSecrets: 
  - name: gcr-json-key
 
 """
    }
  }
  environment {
    DEPLOY_NAMESPACE = "cloudwms-dev"
  }
  stages {
	stage('Build') {
      steps {
	    container('docker-dind') {
		 sh '''
					  		  
        docker build -t angular-app .
        
		 '''
				   }
				   }
				   }
   stage('tag and push') {
    steps {
	 container('docker-dind') {
      sh '''
        TAG_NAME=$(git rev-parse HEAD)
		IMAGE_TAG=${TAG_NAME:0:7}
		
		git log --format="%H" -n 3
		git log --format="%H" -n 2
		git log --format="%H" -n 1
		git rev-parse HEAD~1
		git rev-parse HEAD~2
		git rev-parse HEAD~3

        docker login -u _json_key -p "$(cat /home/first.json)" https://gcr.io
                            

        docker tag  angular-app  gcr.io/cloudwms-195710/angular-app:$IMAGE_TAG
        docker push gcr.io/cloudwms-195710/angular-app:$IMAGE_TAG

       
         '''
           }  
		   }
		   }
stage('cluster-context') {
 steps {
  container('kubectl') {
    sh '''
        kubectl config set-credentials cloudwmsuser --username=$SECRET_USERNAME --password=$SECRET_PASSWORD

        kubectl config set-cluster cloudwmscluster --insecure-skip-tls-verify=true --server=https://35.239.186.113

        kubectl config set-context cloudwmscontext --user=cloudwmsuser --namespace=cloudwms-dev --cluster=cloudwmscluster

        kubectl config use-context cloudwmscontext
 
        kubectl get pods -n cloudwms-dev
				    		 	 
		 '''
					   }
					   }
					   }
stage('pod-deployment') {
  
 steps {
   
       
     
  container('kubectl') {
    sh '''
  		 TAG_NAME=$(git rev-parse HEAD)
         IMAGE_TAG=${TAG_NAME:0:7}


         source pod-deployment.sh; application_deployment gcr.io/cloudwms-195710/angular-app cloudwms-angular-app 1 $IMAGE_TAG 80 

        '''
  
 
   }
 }
  }

stage('exposing pod ') {
 steps {
  container('kubectl') {
    sh '''
		 
        source pod-service.sh; application_service   cloudwms-angular-app 31000  80

        
        '''
                           }
                           }
                           }
}
}

stage('roll out ') {
 steps {
  container('kubectl') {

{
      sh '''
		 TAG_NAME=$(git rev-parse HEAD~2)
         IMAGE_TAG=${TAG_NAME:0:7}
         
         sleep 100
         
        source rolling-bach.sh; rolling-back-script cloudwms-angular-app gcr.io/cloudwms-195710/angular-app $TAG_NAME 
        
        
        '''
                               
                           }
  }}
