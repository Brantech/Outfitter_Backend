FROM node:8.12-jessie

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]