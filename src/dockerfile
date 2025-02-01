# Use Node.js as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Serve the React app using a lightweight web server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "8080"]

# Expose port  8080
EXPOSE 8080

