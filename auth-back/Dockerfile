# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory for the app inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first (to take advantage of Docker cache)
COPY package*.json ./

# Install dependencies (this includes both app dependencies and dev dependencies)
RUN npm install

# Copy the rest of the application code to the working directory in the container
COPY . .

# Expose the port the app will run on (default for Node.js apps is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
