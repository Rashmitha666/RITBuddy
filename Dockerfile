# ---- Frontend build ----
FROM node:18 AS frontend

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install

COPY Frontend/ ./

# ---- Backend setup ----
FROM node:18 AS backend

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY TempBackend/ ./

# ---- Final image ----
FROM node:18 AS final

WORKDIR /app

# Copy backend from previous stage
COPY --from=backend /app/backend ./

# Copy frontend build into backend's public folder
COPY --from=frontend /app/frontend/dist ./public

# Expose backend port (change if your backend runs on a different port)
EXPOSE 3000

# Start the backend server
CMD ["node", "MainServer.js"]
