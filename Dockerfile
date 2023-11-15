# Build stage
FROM node:21-alpine as builder

# Define build arguments with default values
ARG APPLICATION=default
ARG ENVIRONMENT=default
ARG SCALEUNIT=default

WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./
COPY ./package-lock.json ./

# Install npm packages
RUN npm install --force

# Copy the rest of the application code
COPY ./ ./

# Copy the .env template
COPY ./.env.template ./.env

# Install Python
RUN apk add python3

# Install curl
RUN apk --no-cache add curl

# Make the script executable
RUN chmod +x ./setup.sh

# Use RUN to execute the setup.sh script with parameters
RUN ./setup.sh $APPLICATION $ENVIRONMENT $SCALEUNIT

# Run the application
CMD ["npm", "run", "dev"]
