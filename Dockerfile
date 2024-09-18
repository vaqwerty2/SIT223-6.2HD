# Step 1: Build the React application
# Using a Node.js base image to install dependencies and build the application
FROM node:18 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Step 2: Serve the application using Nginx
# Using an Nginx base image to serve the built application
FROM nginx:stable-alpine

# Copy the build output from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the Nginx configuration file (if you have one, else the default is used)
# If you have a custom nginx.conf, uncomment the line below and add your nginx.conf in the project directory
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to the outside once the container has launched
EXPOSE 3000

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
