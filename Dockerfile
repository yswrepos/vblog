FROM node:20-alpine AS app-base
WORKDIR /app

COPY ./package.json ./

RUN set -x ; npm install

COPY . ./

RUN npm run docs:build && \
    rm -rf /app/node_modules

FROM nginx:alpine
COPY server-prod.conf /etc/nginx/conf.d/default.conf
COPY --from=app-base /app/docs/.vuepress/dist /usr/share/nginx/html
