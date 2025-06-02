# Backend build
FROM node:18 AS backend
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY TempBackend/ .

# Frontend build
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy built frontend & backend
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/frontend /app/frontend

# Serve frontend (optional: serve via backend or static server)
# Copy static files to backend public dir if needed

# Start backend server (assuming entry is `dist/index.js`)
CMD ["node", "TempBackend/MainServer.js"]
