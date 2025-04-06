# Stage 1: Build stage
FROM node:20-slim AS builder


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --only=production


COPY . .

# Stage 2: Production stage (final lightweight image)
FROM node:20-alpine


WORKDIR /usr/src/app


COPY --from=builder /usr/src/app /usr/src/app


EXPOSE 3000


CMD ["npm", "start"]
