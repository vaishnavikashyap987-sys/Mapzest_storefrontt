FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

# Expose the API port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
