# Compile the frontend react app
FROM node:8 AS frontendbuilder

ENV URL=https://localhost/api

WORKDIR /home/node/app
COPY ./client/package.json .

RUN npm install
COPY ./client/src src/
COPY ./client/public public/
# need to replace the api URL 
RUN sed -i -e "s|process.env.URL|'${URL}'|" ./src/utils/Axios.js
RUN npm run-script build



# Create the frontend container with Nginx
FROM nginx:1.15.8-alpine

RUN apk add --update netcat-openbsd && rm -rf /var/cache/apk/*

COPY --from=frontendbuilder /home/node/app/build /var/www
COPY ./nginx/nginx.conf /etc/nginx/conf.d/backend.conf
COPY ./nginx/certs/* /etc/nginx/certs/

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]