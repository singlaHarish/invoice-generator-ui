# Use Node.js as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port  8080
EXPOSE 8080

# Start the app using the custom command
CMD ["npm", "run", "start:prod"]


