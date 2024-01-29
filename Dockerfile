FROM node:21 as builder

WORKDIR /application

COPY . .

RUN npm install
RUN npm run build



FROM nginx

COPY nginx/ /etc/nginx/

COPY entrypoint.sh /docker-entrypoint.d/entrypoint.sh

COPY --from=builder /application/dist/* /usr/share/nginx/html
