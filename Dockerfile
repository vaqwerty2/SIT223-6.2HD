# Use the Node.js 16 image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Ensure the working directory is accessible to Jenkins user
RUN chown -R node:node /app

# Copy the entire project into the container
COPY . .

# Expose port 3000 for the React app (the app can be run on any port as specified in the Jenkinsfile)
EXPOSE 3000

# The default command to run the React app
CMD ["npm", "start"]
