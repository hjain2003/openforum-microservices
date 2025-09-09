# Use Node for build and runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Build args for environment variables
ARG REACT_APP_POST_API
ARG REACT_APP_COMMENT_API

# Set env variables so React build picks them up
ENV REACT_APP_POST_API=$REACT_APP_POST_API
ENV REACT_APP_COMMENT_API=$REACT_APP_COMMENT_API

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]
