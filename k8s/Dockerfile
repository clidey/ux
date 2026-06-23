FROM node:lts-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:lts-alpine AS docs-builder
WORKDIR /app
RUN npm install -g @clidey/dory@latest
COPY docs/ ./
COPY k8s/scripts/patch-docs-base.sh ./patch-docs-base.sh
RUN dory build && chmod +x patch-docs-base.sh && ./patch-docs-base.sh dist /docs

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY k8s/config/nginx-default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=docs-builder /app/dist /usr/share/nginx/html/docs
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
USER nginx

CMD ["nginx", "-g", "daemon off;"]
