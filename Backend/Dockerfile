FROM node:22

WORKDIR /Backend

COPY ./package.json /Backend

RUN npm install

COPY . /Backend

EXPOSE 5000

CMD npm run start