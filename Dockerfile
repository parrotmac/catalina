FROM node:8-alpine

EXPOSE 80
ENV PORT 80

ADD . /usr/src/app/

WORKDIR /usr/src/app/

RUN npm install
RUN npm rebuild node-sass
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
