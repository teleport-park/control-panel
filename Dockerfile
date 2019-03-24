FROM node:latest AS build-image

ARG stage_suffix=""

WORKDIR /app

COPY control-panel-app/* /app/

RUN npm install
RUN npm run build${stage_suffix}

FROM nginx:latest AS final-image

COPY --from=build-image /app/dist/* /usr/share/nginx/html/
