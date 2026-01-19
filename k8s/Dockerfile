FROM node:25.3.0-alpine3.22 AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build


FROM nginx:alpine
COPY k8s/config/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
