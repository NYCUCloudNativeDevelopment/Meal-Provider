FROM node:lts-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g http-server
RUN npm install -g pnpm@9.0.6 

WORKDIR /app

COPY package*.json ./

RUN pnpm install
COPY . . 

RUN pnpm run build

FROM docker.io/nginx:1.21.1-alpine
WORKDIR /www
COPY --from=0 /app/dist /www

COPY conf.d/* /etc/nginx/conf.d/

EXPOSE 3000