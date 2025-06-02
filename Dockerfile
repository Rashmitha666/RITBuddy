# Backend build
FROM node:18 AS backend
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY TempBackend/ .

# Frontend build
FROM node:18 AS frontend
WORKDIR /frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .

# Production image
FROM node:18-alpine
WORKDIR /

# Copy built frontend & backend
COPY --from=backend /backend /backend
COPY --from=frontend /frontend /frontend

# Serve frontend (optional: serve via backend or static server)
# Copy static files to backend public dir if needed

# Start backend server (assuming entry is `dist/index.js`)
CMD ["node", "TempBackend/MainServer.js"]
