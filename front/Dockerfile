# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del frontend al contenedor
COPY . .

# Dale permisos de ejecución al entrypoint
RUN chmod +x /app/docker-entrypoint.sh

# Instala http-server de forma global
RUN npm install -g http-server

# Expone el puerto en el que se ejecutará http-server
EXPOSE 8080

#Ejecutamos el Script para cargar las variables de entorno al config.js
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Comando para iniciar el servidor
CMD ["http-server", "-p", "8080", "-a", "0.0.0.0"]
