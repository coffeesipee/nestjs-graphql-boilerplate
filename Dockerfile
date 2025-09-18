FROM node:22-alpine as development-stage

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm i

COPY . .

CMD ["npm", "run", "start:dev"]

FROM development-stage as build-stage

WORKDIR /app

COPY --from=development-stage /app /app

RUN pnpm run build

FROM node:22-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app /app

CMD ["npm", "run", "start"]

