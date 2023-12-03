# Stage 1: Use an official Node runtime as a parent image
FROM node:18-alpine AS build
# Set the working directory in the container
WORKDIR /app
# Copy package.json to the container
COPY package.json ./
# Install app dependencies
RUN npm install
# Copy the current directory contents into the container at /app
COPY . .
# Build the Vite application
RUN npm run build

# Stage 2: Serve the static production files using nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .