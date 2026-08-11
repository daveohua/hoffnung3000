FROM node:22-bookworm

WORKDIR /usr/src/app

COPY . .

# `postinstall` builds the client bundle. Copying the full source before
# installation makes that script work during a Docker build.
RUN npm ci

ENV NODE_ENV=production

EXPOSE 10000

CMD [ "npm", "run", "start" ]
