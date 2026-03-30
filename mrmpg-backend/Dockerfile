# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build


# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN npm prune --production

EXPOSE 5000

CMD ["node", "dist/index.js"]
