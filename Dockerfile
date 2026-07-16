# Build stage
FROM node:26-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.server.json ./
COPY webpack.common.js ./
COPY webpack.prod.js ./
RUN npm install
COPY . .
RUN npm run build:frontend
RUN npm run build:server

# Production stage
FROM node:26-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
