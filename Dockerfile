FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
