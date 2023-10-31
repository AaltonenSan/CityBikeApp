FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
