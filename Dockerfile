FROM alpine:edge

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add curl

COPY dist /app
WORKDIR /app

EXPOSE 9000

CMD [ "./serve" ]