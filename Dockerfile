FROM alpine:edge

COPY dist /app
WORKDIR /app

RUN apk --no-cache add nodejs npm
RUN npm install --production \
    && npm cache clean --force \
    && apk del npm

CMD [ "node", "cmd.js" ]
