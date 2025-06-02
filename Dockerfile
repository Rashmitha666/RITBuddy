# ---- Frontend build ----
FROM node:18 AS frontend

WORKDIR /app/frontend

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ ./
RUN npm run build

# ---- Backend setup ----
FROM node:18 AS backend

WORKDIR /app/backend

# Install backend deps
COPY package*.json ./
RUN npm install

# Copy backend source files
COPY TempBackend/ ./

# ---- Final image ----
FROM node:18 AS final

# Set workdir
WORKDIR /app

# Copy backend from build stage
COPY --from=backend /app/backend ./

# Copy built frontend into backend/public (or similar)
COPY --from=frontend /app/frontend/dist ./public

# Default start command (update if needed)
CMD ["npm", "start"]
