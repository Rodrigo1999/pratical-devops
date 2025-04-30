# ------------------------Base of image------------------------
FROM node:20-alpine AS base
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install -g pnpm
USER node
COPY package*.json ./
COPY pnpm-lock*.yaml ./
COPY tsconfig.json ./

# ------------------------For dev environment------------------------
FROM base AS dev
RUN pnpm install
COPY . .
EXPOSE 5000
CMD [ "pnpm", "dev" ]

# ------------------------For prod environment------------------------
# Build stage
FROM base AS build
RUN pnpm install
COPY . .
RUN pnpm build

# Image prod
FROM base AS prod
COPY --from=build ./home/node/app/build ./build
RUN pnpm install --frozen-lockfile --prod
EXPOSE 5000
CMD [ "pnpm", "start" ]