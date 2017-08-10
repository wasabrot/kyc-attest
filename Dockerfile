FROM node:8.2.1
ADD . /kyc-attest
WORKDIR /kyc-attest
RUN npm install
CMD ["sh", "-c","npm", "start"]
