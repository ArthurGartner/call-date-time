FROM node:16 as build

WORKDIR '/app'
COPY /src/package.json ./
RUN npm install
COPY /src .

RUN npm run build

FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html