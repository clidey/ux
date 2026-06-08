FROM --platform=linux/amd64 node:18.12.1-alpine AS build-stage

WORKDIR /app/
RUN npm i -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile && pnpm build

FROM nginx:1.25.3-alpine
COPY --from=build-stage /app/release/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
USER nginx