FROM node:21 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install @angular/cli -g
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
