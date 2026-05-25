FROM node:lts-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:lts-alpine AS docs-builder
WORKDIR /app
RUN npm install -g @clidey/dory
COPY docs/ ./
COPY k8s/scripts/patch-docs-base.sh ./patch-docs-base.sh
RUN dory build && chmod +x patch-docs-base.sh && ./patch-docs-base.sh dist /docs

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY k8s/config/nginx-default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=docs-builder /app/dist /usr/share/nginx/html/docs
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
