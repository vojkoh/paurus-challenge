FROM node:20.19.5-slim

RUN mkdir /app
WORKDIR /app
COPY db.json /app/db.json

RUN npm install json-server

EXPOSE 3000

ENTRYPOINT [ "npx", "json-server", "/app/db.json" ]