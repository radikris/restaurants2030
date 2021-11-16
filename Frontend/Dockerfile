FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . ./

CMD ["npm", "run", "start"]