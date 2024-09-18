# Use a specific version of Node.js
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port that the React app will run on (3000 for Create React App)
EXPOSE 3000

# Command to start the React app
CMD ["npm", "start"]
