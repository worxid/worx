# Build Stage
FROM node:16.13.1-alpine as build
LABEL author = "worx.id"
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# production environment
FROM nginx:1.21
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]