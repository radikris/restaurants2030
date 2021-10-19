FROM node:alpine

WORKDIR /restaurants2030

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts

COPY ./ ./

CMD ["npm", "run", "start"]