# Common build stage
ARG NODE_VERSION=21.7.3

FROM node:${NODE_VERSION}-alpine as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm run build

ENV PORT 3001

EXPOSE 3001

# Dvelopment build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start-no-build"]