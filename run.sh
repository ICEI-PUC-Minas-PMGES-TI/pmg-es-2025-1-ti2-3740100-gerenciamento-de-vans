#!/bin/bash

# Iniciar o backend
cd src/back/backend
./mvnw spring-boot:run &

# Aguardar o backend iniciar
sleep 10

# Iniciar o frontend
cd ../../front/van-wise-front
npm start 