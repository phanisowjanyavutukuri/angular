function application_service()
{

local SERVICE_NAME=${1:?Provide the SERVICE_NAME}
local NODE_PORT=${2:?Provide the NODE_PORT}
local CONTAINER_PORT=${3:?Provide the CONTAINER_PORT}



echo "
apiVersion: v1
kind: Service
metadata:
  name: $SERVICE_NAME
  labels:
    run: $SERVICE_NAME
spec:
  type: NodePort
  ports:
  - port: $CONTAINER_PORT
    targetPort: $CONTAINER_PORT
    protocol: TCP
    nodePort: $NODE_PORT
  selector:
    app: $SERVICE_NAME  " | kubectl apply -f -
    }    
