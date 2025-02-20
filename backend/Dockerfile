# backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

# Build env variables in a real project, or set them in Cloud Run
EXPOSE 8080
CMD ["node", "index.js"]
