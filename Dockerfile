## BUILD IMAGE
FROM node:10 AS build-image

ARG stage="stage"

WORKDIR /app
COPY ./control-panel-app .

RUN npm install
RUN npm run build-${stage}


## RUNNER SERVER IMAGE
FROM nginx:latest AS final-image


WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-image /app/dist/* .
RUN ls -la

ENV API_BASE_URL="http://teleport-park.com/"

CMD echo '{"api_base_url": "{$API_BASE_URL}"}' > ./config/app-init-config.json \
    && nginx -g 'daemon off;'
