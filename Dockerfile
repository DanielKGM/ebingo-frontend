# Fase 1: Construção do Angular
FROM node:21 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Fase 2: Servindo o Angular diretamente com `ng serve` durante o desenvolvimento
FROM node:21
WORKDIR /app
COPY . .
RUN npm install
RUN npm install @angular/cli -g
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
