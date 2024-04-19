## Supports x86_64, x86, arm, and arm64
FROM debian:buster-slim as builder

RUN apt-get update && apt-get install -y curl gnupg
RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 0x1657198823e52a61  && \
    echo "deb http://download.zerotier.com/debian/buster buster main" > /etc/apt/sources.list.d/zerotier.list
RUN apt-get update && apt-get install -y zerotier-one=1.8.6
RUN mkdir -p /var/lib/zerotier-one
COPY main.sh /var/lib/zerotier-one/main.sh

# Instala Node.js y npm
RUN apt-get update && \    
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs
RUN npm install -g node-gyp
# Copiamos los archivos de la aplicación al contenedor
COPY . /app
# Establecemos el directorio de trabajo en la imagen
WORKDIR /app
# Instalamos las dependencias de la aplicación
RUN npm install
# Build app
RUN npm run build
# Set PATH
ENV PATH="/usr/bin/node:${PATH}"
ENV LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu/libssl.so.1.1:$LD_LIBRARY_PATH


# Etapa de producción
FROM debian:buster-slim
LABEL version="1.8.6"
LABEL description="Containerized ZeroTier and Nest app."
# ZeroTier relies on UDP port 9993
EXPOSE 9993/udp
# Exponer el puerto 8080 para la aplicación Nest.js
EXPOSE 8080
# Copiar los archivos construidos desde la etapa de construcción
COPY --from=builder /usr/bin/node /usr/bin/node
COPY --from=builder /usr/lib/x86_64-linux-gnu /usr/lib/x86_64-linux-gnu
COPY --from=builder /usr/sbin/zerotier-cli /usr/sbin/zerotier-cli
COPY --from=builder /usr/sbin/zerotier-idtool /usr/sbin/zerotier-idtool
COPY --from=builder /usr/sbin/zerotier-one /usr/sbin/zerotier-one
COPY --from=builder /var/lib/zerotier-one /var/lib/zerotier-one
COPY --from=builder /app /app
# Establecemos el directorio de trabajo en la imagen
WORKDIR /app
# Copiar script de inicio
COPY start.sh /usr/local/bin/start.sh
# Establecer permisos para el script de inicio
RUN chmod +x /usr/local/bin/start.sh
# Comando para iniciar la aplicación
CMD ["/usr/local/bin/start.sh"]