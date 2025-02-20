# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: use an Nginx or http-server to serve built files
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/homeschool-lesson-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
