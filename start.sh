#!/bin/bash
envsubst '$EUREKA_HOST $EUREKA_PORT $ZUUL_HOST $ZUUL_PORT $SEAWOLF_UI_HOST' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
nginx -g 'daemon off;'
