kubectl create namespace meshdemo-ns
kubectl label namespace meshdemo-ns servicemesh.oci.oracle.com/sidecar-injection=enabled
kubectl create secret -n meshdemo-ns docker-registry amsocirsecret --docker-username 'frsxwtjslf35/oracleidentitycloudservice/mika.rinne@oracle.com'  --docker-password 'Y}SMSjCO02X5o){e.(-K'  --docker-server 'ams.ocir.io'
kubectl create -f app.yaml
kubectl create -f meshify-app.yaml
kubectl create -f bind-app.yaml
kubectl get svc meshdemo-ingress-gateway-deployment-service -n meshdemo-ns