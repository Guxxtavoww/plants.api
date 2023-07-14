FROM node:18 AS builder

WORKDIR /server

COPY . .

RUN yarn

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]
