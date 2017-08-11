# testuport

Generated project structure with  https://expressjs.com/en/starter/generator.html


Google Cloud Commands

export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
docker build -t gcr.io/${PROJECT_ID}/kyc-attest:v1 .
docker run -d --expose=8081 gcr.io/${PROJECT_ID}/kyc-attest:v1
docker run  gcr.io/${PROJECT_ID}/kyc-attest:v1 /bin/sh -c “ls -la”



