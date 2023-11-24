# Use an official Node runtime as a parent image
FROM node:18 AS build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install app dependencies
RUN npm install
# Copy the current directory contents into the container at /app
COPY . .
# Build the Vite application
RUN npm run build

# Use a lightweight Node image for the production build
FROM node:18-alpine
# Set the working directory in the container
WORKDIR /app
# Copy only the production build from the previous stage
COPY --from=build /app/dist /app
# Install a simple HTTP server to serve the static files
RUN npm install -g serve
# Expose the port on which the server will run
EXPOSE 5000
# Define the command to run your application
CMD ["serve", "-s", ".", "-l", "5000"]
