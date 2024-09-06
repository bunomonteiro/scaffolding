FROM node:20 as build-stage

# faz da pasta 'app' o diretório atual de trabalho
WORKDIR /app

# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# Instala as dependências
RUN npm install

# copia arquivos e pastas para o diretório atual de trabalho (pasta 'app')
COPY . .

# compila a aplicação de produção com minificação
RUN npm run build

FROM nginx:stable-alpine-slim as production-stage

# Copia os arquivos construídos para o diretório padrão do NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Ajusta as permissões para garantir que o NGINX possa acessar os arquivos
RUN chmod -R 755 /usr/share/nginx/html

# Copia o arquivo de configuração personalizado do NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80 para tráfego HTTP
EXPOSE 80

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]
