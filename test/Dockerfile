FROM node:8.12-jessie
WORKDIR /usr/src/test
COPY ./docker-scripts ./docker-scripts/
COPY ./test/package.json ./package.json
RUN npm install
COPY ./test ./
CMD [ "npm", "start" ]