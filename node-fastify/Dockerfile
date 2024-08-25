FROM node:22-alpine

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install fastify

EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
