FROM node:10

EXPOSE 3000

RUN mkdir -p usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

ENV TZ Europe/Moscow

CMD ["node", "index.js"]