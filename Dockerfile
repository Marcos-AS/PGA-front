FROM node:22 AS builder

ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# servidor Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx (opcional)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto por el que Nginx sirve la app
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]