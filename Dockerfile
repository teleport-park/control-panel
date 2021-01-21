## BUILD IMAGE
FROM node:10 AS build-image

ARG stage="stage"

WORKDIR /app
COPY ./control-panel-app .

RUN npm install
RUN npm run build-${stage}


## RUNNER SERVER IMAGE
FROM nginx:latest AS final-image

COPY ./docker /docker
RUN chmod +x /docker/docker-entrypoint.sh

WORKDIR /app
RUN rm -rf ./*
COPY --from=build-image /app/dist/* .

ENV API_BASE_URL="http://teleport-park.com/"
ENV CONTEXT="/"

ENTRYPOINT ["/docker/docker-entrypoint.sh"]
