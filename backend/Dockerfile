FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

ENV DB_USER=postgres
ENV DB_PASSWORD=postgres

CMD ["npm", "start"]