# Usar uma imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de configuração do back-end
COPY Back-End/package.json Back-End/yarn.lock ./

# Instalar as dependências
RUN yarn install

# Copiar o restante do código do back-end
COPY Back-End/ .

# Executar o script de build (se necessário)
RUN chmod +x ./build.sh
RUN ./build.sh
# RUN yarn install
# RUN yarn build
# RUN yarn prisma migrate deploy

# Expor a porta que o back-end vai usar
EXPOSE 3000

# Comando para rodar o back-end
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn start"]
# CMD ["yarn", "start"]

