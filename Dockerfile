FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

RUN npm run build

COPY . .

EXPOSE 3000

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./

CMD [ "npm", "run", "start:prod"]
