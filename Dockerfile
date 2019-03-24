FROM node:latest AS build-image

WORKDIR /app

COPY control-panel-app/* /app/

RUN npm install
RUN npm run build-stage


FROM nginx:latest AS final-image

COPY --from=build-image /app/dist/* /usr/share/nginx/html/
