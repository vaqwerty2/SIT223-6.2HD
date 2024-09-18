# Use a specific version of node to avoid unexpected updates
FROM node:14

# Set a working directory
WORKDIR /app

# Set npm to use a custom cache directory within the Docker container
ENV NPM_CONFIG_CACHE=/app/.npm

# Install global npm dependencies if any
RUN npm install -g your-global-package

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Specify the command to run your app
CMD ["npm", "start"]
