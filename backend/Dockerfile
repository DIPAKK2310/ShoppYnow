# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json & lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
