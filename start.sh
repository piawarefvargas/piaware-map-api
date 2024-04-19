#!/bin/bash

# Iniciar Zerotier
zerotier-one -d &

zerotier-cli join ZEROTIER_NETWORK_ID &

# Iniciar la aplicación Node.js
node dist/main.js