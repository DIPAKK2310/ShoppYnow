# Stage 1: Build Vite app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the production-ready app
RUN npm run build

#----------------
# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy build output from first stage to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
