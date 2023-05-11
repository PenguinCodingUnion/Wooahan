FROM node:18.14.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
