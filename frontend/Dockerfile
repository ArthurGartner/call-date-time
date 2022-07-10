FROM node:16 as build

WORKDIR '/app'
COPY /src/package.json ./
RUN npm install
COPY /src .
CMD ["bash", "-c", "npm run serve"]