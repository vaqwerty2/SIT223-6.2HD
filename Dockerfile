# Start with a base image that includes Node.js
FROM node:14

# Set the working directory in the Docker container to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your React app will run on (default is 3000 for Create React App)
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
