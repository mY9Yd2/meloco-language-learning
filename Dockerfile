FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

FROM nginx:1.26-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
