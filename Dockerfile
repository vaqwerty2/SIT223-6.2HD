# Use Node.js as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Change ownership of npm global directory to ensure it has correct permissions
RUN mkdir -p /usr/local/etc/npmrc && chown -R node:node /usr/local/etc/npmrc

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
