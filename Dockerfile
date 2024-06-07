# Utiliza la imagen oficial de Node.js
FROM node:21

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto definido en la variable de entorno
EXPOSE ${PORT}

# Inicia la aplicación
CMD ["npm", "start"]