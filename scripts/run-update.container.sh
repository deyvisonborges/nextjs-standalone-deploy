#!/bin/bash

# Nome da imagem Docker e do contêiner
IMAGEM="storefront-next.image.prod"
CONTAINER_NAME="storefront-next.container.prod"

# Constrói a imagem
docker build . -f Dockerfile -t $IMAGEM

# Para o contêiner antigo (se estiver em execução)
if docker ps | grep -q $CONTAINER_NAME; then
  docker stop $CONTAINER_NAME
fi

# Remove o contêiner antigo (se existir)
if docker ps -a | grep -q $CONTAINER_NAME; then
  docker rm $CONTAINER_NAME
fi

# Cria um novo contêiner com a imagem atualizada
docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGEM
