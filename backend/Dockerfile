FROM node:18

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci
RUN npm run build

EXPOSE 3001
USER node
CMD ["npm", "start"]