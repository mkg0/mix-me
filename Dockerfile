FROM node:8.5-alpine

COPY ./build /

CMD ["node", "server.js"]
