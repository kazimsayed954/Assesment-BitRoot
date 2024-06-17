# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Compile the TypeScript code (if applicable)
RUN pnpm run compile

# Make port 7899 available to the world outside this container
EXPOSE 7899

# Define the environment variables
ENV PORT=7899
ENV MONGODB_URI=mongodb://mongo:27017/myapp

# Start the app
CMD ["node", "./dist/app.js"]
