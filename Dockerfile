# Use the official lightweight Node.js image.
FROM node:18-alpine

# Create and set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose port 8080 for Cloud Run.
EXPOSE 8080

# Command to run the app.
CMD ["node", "index.js"]
