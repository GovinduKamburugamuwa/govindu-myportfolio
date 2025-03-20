FROM node:20

WORKDIR /app

# Install backend dependencies
COPY contact-form-backend/package*.json ./
RUN npm install

# Copy backend files
COPY contact-form-backend/ ./

# Install frontend dependencies
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install

# Copy frontend files
COPY public ./public
COPY src ./src
COPY *.js ./
COPY *.json ./

# Build frontend
RUN npm run build

# Copy build files to where backend expects them
RUN mkdir -p /app/build
RUN cp -r /app/frontend/build/* /app/build/

# Set working directory for execution
WORKDIR /app

# Expose port
EXPOSE 5000
ENV PORT=5000
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]