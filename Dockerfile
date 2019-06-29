FROM node:8.9

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install
RUN npm run tslint
RUN npm run build
RUN npm test

CMD [ "npm", "start" ]