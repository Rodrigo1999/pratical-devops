FROM node:20-alpine AS base
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install -g pnpm
USER node
COPY package*.json ./
COPY pnpm-lock*.yaml ./
RUN pnpm install
COPY . .
EXPOSE 5000
CMD [ "pnpm", "dev" ]

FROM base AS prod
USER root
RUN pnpm build
RUN find node_modules -mindepth 1 -delete
USER node
RUN pnpm install --frozen-lockfile --prod
USER root
RUN find . -mindepth 1 -maxdepth 1 -type d ! \( -name 'build' -o -name 'node_modules' \) -exec rm -r {} \;
USER node
EXPOSE 5000
CMD [ "pnpm", "start" ]