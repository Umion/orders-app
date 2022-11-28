FROM node

WORKDIR /app

COPY . .

RUN npm install -g sequelize-cli

RUN yarn install

EXPOSE 5000

CMD [ "yarn", "start" ]