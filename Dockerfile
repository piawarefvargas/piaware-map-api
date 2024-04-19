# Utilizamos una imagen de Node.js como base
FROM node:latest

# Establecemos el directorio de trabajo en la imagen
WORKDIR /app

# Copiamos los archivos de la aplicación al contenedor
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos el resto de los archivos de la aplicación al contenedor
COPY . .

RUN npm run build

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]