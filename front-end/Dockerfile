FROM node:latest AS build
WORKDIR /app

COPY . /app/

RUN npm install --silent
RUN npm install react-scripts  -g --silent

RUN npm run-script build