FROM node:alpine

WORKDIR /teste-dasaexp

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:docker"]