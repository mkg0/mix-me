FROM node:8.5-alpine AS builder
ADD ./client /client
ADD ./server /server
ADD ./tools/build.sh /build.sh
RUN ./build.sh

FROM node:8.5-alpine AS runner
COPY --from=builder ./build /

CMD ["node", "server.js"]
