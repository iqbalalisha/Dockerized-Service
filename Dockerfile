# Stage 1: Build stage
FROM node:20-slim AS builder

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Stage 2: Production stage (final lightweight image)
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only the built application from the previous stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
