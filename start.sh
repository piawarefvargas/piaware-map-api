#!/bin/bash

# Cargar el módulo del kernel para TUN/TAP
modprobe tun

# Crear el dispositivo TUN
ip tuntap add dev tun0 mode tun

# Establecer la dirección IP y la configuración de red para el dispositivo TUN
ip addr add 172.27.100.4/16 dev tun0
ip link set dev tun0 up

# Iniciar Zerotier
zerotier-one -d &

zerotier-cli join ZEROTIER_NETWORK_ID &

# Iniciar la aplicación Node.js
node dist/main.js