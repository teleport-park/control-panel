#!/usr/bin/env bash
set -e
TEMPLATES_DIR=$(dirname $0)/templates

## Put application configuration
echo "Putting application config"
cat ${TEMPLATES_DIR}/app-init-config.json | envsubst > ./config/app-init-config.json

## Put webserver aliases
DOCROOT="/usr/share/nginx/app"
if [ ${CONTEXT} != '' ] && [ ${CONTEXT} != '/' ]; then
  TGT="${DOCROOT}${CONTEXT}"
  echo "Context ${CONTEXT} found... making aliasing for it into relational link ${TGT}"
  mkdir -p $(dirname $TGT)
  ln -s /app $TGT
  cat ${TEMPLATES_DIR}/index.html | envsubst > ${DOCROOT}/index.html
else
  echo "Aliasing root $DOCROOT to application"
  ln -s /app $DOCROOT
fi;

echo "Putting nginx configuration"
cat ${TEMPLATES_DIR}/nginx.conf | envsubst > /etc/nginx/conf.d/default.conf

echo "Starting nginx..."
nginx -g 'daemon off;'

echo "Server complete"
