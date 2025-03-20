FROM node:20

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy backend package files
COPY contact-form-backend/package*.json ./contact-form-backend/
WORKDIR /app/contact-form-backend
RUN npm install
WORKDIR /app

# Copy all project files
COPY . .

# Build frontend
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 5000
ENV PORT=5000
ENV NODE_ENV=production

# Use Node.js backend server
CMD ["node", "contact-form-backend/server.js"]