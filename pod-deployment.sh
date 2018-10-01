function application_deployment()
{
local IMAGE_NAME=${1:?Need the IMAGE_NAME}
local DEPLOYMENT_NAME=${2:?DEPLOYMENT_NAME}
local REPLICA_NUMBER=${3:?Need the IMAGE_NAME}
local TAG_NAME=${4:?Need the TAG_NAME}
local CONTAINER_PORT=${4:?Need the CONTAINER_PORT}
echo "
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $DEPLOYMENT_NAME
  labels:
    app: $DEPLOYMENT_NAME
spec:
  replicas: $REPLICA_NUMBER
  selector:
    matchLabels:
      app: $DEPLOYMENT_NAME
  template:
    metadata:
      labels:
        app: $DEPLOYMENT_NAME 
    spec:
      containers:
      - name: $DEPLOYMENT_NAME
        image: $IMAGE_NAME:$TAG_NAME 
        ports:
        - containerPort: 8081
      imagePullSecrets: 
      - name: gcr-json-key" | kubectl apply -f -
    }    
