FROM --platform=linux/amd64 node:18.12.1-alpine AS build-stage

# INSTALLING...
RUN npm i -g pnpm

# BUILDING...
WORKDIR /app/

# Copy all files for better layer caching
COPY . .

RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm build

# DEPLOYMENT...
FROM nginx:1.25.3
COPY --from=build-stage /app/release/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html