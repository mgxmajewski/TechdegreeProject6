FROM node:17-slim

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
COPY . ./

CMD ["node", "app.js"]