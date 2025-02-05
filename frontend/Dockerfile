# Use the official Node.js 21 image based on Alpine Linux
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "run", "serve"]