FROM node:18-alphine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./dist ./dist

CMD ["npm", "start:dev"]