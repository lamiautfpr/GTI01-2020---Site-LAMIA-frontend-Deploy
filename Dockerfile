# Imagem de Origem
FROM node:14-alpine

WORKDIR /app

COPY . /app
RUN yarn

ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL=http://localhost:3333

ENTRYPOINT yarn start
EXPOSE 3000
