FROM node:16-alpine
COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . ./

CMD ["npm", "run", "start"]