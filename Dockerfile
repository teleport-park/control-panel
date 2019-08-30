FROM node:latest AS build-image

ARG stage_suffix="stage"

ARG destination_path="/usr/share/nginx/html/"

COPY ./control-panel-app /app

WORKDIR /app

RUN npm install
RUN npm run build-${stage_suffix}

FROM nginx:latest AS final-image

COPY --from=build-image /app/dist/* {destination_path}

ENV API_BASE_URL="api-base-url"
RUN echo '{"api_base_url": "{$API_BASE_URL}"}' > {destination_path}/app/dist/control-panel-app/config/app-init-config.json