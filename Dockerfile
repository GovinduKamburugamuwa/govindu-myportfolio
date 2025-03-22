FROM node:20

WORKDIR /app

# Copy only backend files
WORKDIR /app/contact-form-backend

# Copy package files for backend
COPY contact-form-backend/package*.json ./
RUN npm install

# Copy backend code
COPY contact-form-backend/ ./

# Expose port
EXPOSE 5000
ENV PORT=5000
ENV NODE_ENV=production

# Start backend server
CMD ["node", "/app/contact-form-backend/server.js"]