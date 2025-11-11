💻 Ares Control Backend - Teste de Candidatura

Este repositório contém o código-fonte do backend da aplicação de controle de usuários e endereços, desenvolvido como parte do processo seletivo para a vaga de Desenvolvimento na Ares Control.

Candidato: Danilo Martins da Silva

🚀 Status da Aplicação e Acesso

A aplicação backend é um serviço RESTful construído com NestJS, Prisma e PostgreSQL, e está hospedada na plataforma Render.

Recurso

URL de Acesso

Aplicação Online (API Base)

https://ares-control-backend-1.onrender.com

Documentação (Swagger UI)

https://ares-control-backend-1.onrender.com/api

Frontend (Permitido)

https://ares-control-frontend.onrender.com

🛠️ Tecnologias Principais

Framework: NestJS (Node.js)

Banco de Dados: PostgreSQL (Configurado via variáveis de ambiente)

ORM: Prisma

Documentação: Swagger (integrado ao NestJS)

Outros: Autenticação JWT, DTOs e Pipes de Validação.

⚙️ Configuração Local

Para rodar o projeto localmente:


Instale as dependências:

yarn install


Configure o Ambiente:
Crie um arquivo .env na raiz do projeto e defina a string de conexão com o seu banco de dados PostgreSQL.

DATABASE_URL="postgresql://user:password@host:port/database"
PORT=3002


Execute as migrações do Prisma:

yarn prisma-init

Inicie o servidor de desenvolvimento:

yarn start:dev

O servidor estará disponível em http://localhost:3002.