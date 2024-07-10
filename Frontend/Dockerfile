FROM node:22

WORKDIR /Frontend

COPY ./package.json /Frontend

RUN npm install

COPY . /Frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]