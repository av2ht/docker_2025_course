FROM node:22-alpine

WORKDIR /app

COPY package.json tsconfig.json .
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json .

RUN npm install --only=production

CMD ["node", "index.js"]
EXPOSE 3000
