FROM node:20.19.5 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine3.20-perl AS production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/paurus-challenge/browser /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
