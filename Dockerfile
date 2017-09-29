FROM node:8.5-alpine as builder

COPY client /client
COPY server /server

COPY build.sh /

RUN /build.sh

FROM node:8.5-alpine

COPY --from=builder ./build /

CMD ["node", "server.js"]
