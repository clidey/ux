FROM node:26.12.0-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# node:26 images no longer bundle corepack; install the pnpm version pinned in package.json's packageManager
RUN npm install -g "pnpm@$(node -p "require('./package.json').packageManager.split('@')[1]")"
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:26.12.0-alpine AS docs-builder
WORKDIR /app
RUN npm install -g @clidey/dory@1.0.8
COPY docs/ ./
# docs/dory.json sets basePath "/docs", so the build is already rooted there.
RUN dory build

FROM nginx:1.31.7-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY k8s/config/nginx-default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=docs-builder /app/dist /usr/share/nginx/html/docs
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
USER nginx

CMD ["nginx", "-g", "daemon off;"]
