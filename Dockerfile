FROM node:16.4.2
WORKDIR /app 

COPY package.json /app 
COPY yarn.lock /app
COPY . .

RUN yarn install 
RUN yarn build

EXPOSE 8000

CMD ["yarn", "start"]