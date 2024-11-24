# Imagem oficial do Node.js como base
FROM node:16

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos necessários para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta (necessário para o Render detectar)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]