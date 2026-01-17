#FROM alpine:latest
FROM node:25-alpine AS build_step

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

FROM node:25-alpine AS publish_step
WORKDIR /app
COPY --from=build_step /app/ ./

#CMD [ "bash" ]
#CMD ["node", "."]
CMD ["yarn", "preview"]
#CMD ["yarn", "dev", "--host"]
