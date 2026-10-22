FROM node:26.12.0-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:26.12.0-alpine AS docs-builder
WORKDIR /app
RUN npm install -g @clidey/dory@1.0.6
COPY docs/ ./
# docs/dory.json sets basePath "/docs", so the build is already rooted there.
RUN dory build

FROM nginx:1.31.6-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY k8s/config/nginx-default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=docs-builder /app/dist /usr/share/nginx/html/docs
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
USER nginx

CMD ["nginx", "-g", "daemon off;"]
