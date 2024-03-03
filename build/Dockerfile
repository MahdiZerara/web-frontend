# Stage 1: Build the ReactJS application
FROM node:18.18.1@sha256:eb0c3fe14562eb135fb154841d61e28816371e6bac30b059e6f6aabd356b6c6c as build
ARG ENVIRONMENT=prod
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN make build ENVIRONMENT=$ENVIRONMENT

# Stage 2: Serve the ReactJS application build using Nginx
FROM nginx:1.25.3@sha256:d2e65182b5fd330470eca9b8e23e8a1a0d87cc9b820eb1fb3f034bf8248d37ee
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
