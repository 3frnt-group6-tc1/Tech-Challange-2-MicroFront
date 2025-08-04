FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 4300
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine AS prod

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/Tech-Challange-2-MicroFront /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]