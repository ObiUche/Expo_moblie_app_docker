## pull the small image 
FROM node:20-alpine
##  set up work directory nameds app
WORKDIR /app

##  we need ngork for tunnels that allows up to connect to expo from a url easier for remote collboration
RUN apk add --no-cache python3 make g++ git curl bash
## run is a socker instruction that will execute commands in the container
## creates a new image
## apk is the package manager for alpine linux
## add installs packages
## for the ngork we need python3 make g++ git curl bash to use tunnels with expo

## install expo image picker 
RUN npm install expo-image-picker 
RUN npm install firebase
## install firebase

RUN npm install -g @expo/ngrok@latest
## npm install -g installs a package globally

## copy all dependicies in the moblie package.json file
COPY moblie/package*.json ./

## npm install all dep clean install FAST
RUN npm ci

## COPY files from /moblie to /app
COPY moblie/ ./

## EXPOSE EXPO DEV PORTS 
EXPOSE 8081 19000 19001 19002
## 8081 IS THE METRO Bundler port for expo
## 19000 is the primary port for expo go the app (live reloading from you phone)
## 19001 is the port for the web version of expo
## 19002 is the port for the tunnel connection

##COMMAND  that runs a container

CMD ["npx","expo","start","--tunnel","--clear"]
## npx runs npm packages without installing them globally
## "expo start" starts the expo development server
## --tunnel uses the tunnel connection so you can connect from your phone