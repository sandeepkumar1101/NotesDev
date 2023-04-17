# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 5000 for the API server
EXPOSE 5178

# Start the API server
CMD [ "npm", "start" ]

# Set the environment variables
ENV PORT="5178"
ENV MONGO_URL="mongodb+srv://akshay:sandybest@cluster0.tr0jgyu.mongodb.net/?retryWrites=true&w=majority"