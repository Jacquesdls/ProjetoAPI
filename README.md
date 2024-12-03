# 🎥  GRAVAÇÃO DO PROJETO

[Acessar Gravação ](https://www.youtube.com/watch?v=YcHOEe2qGoc)

<h1 align="center">  API RESTful para Aplicações Web/Mobile</h1>

<p align="center">
  <b>Este projeto apresenta o desenvolvimento de uma API RESTful voltada para aplicações Web e Mobile, com autenticação de usuários, manipulação de dados e segurança robusta.</b>
</p>

<p align="center">
  <a href="#-tecnologias-utilizadas">Tecnologias Utilizadas</a> | 
  <a href="#-estrutura-da-solucao">Estrutura da Solução</a> | 
  <a href="#-funcionalidades">Funcionalidades</a> | 
  <a href="#-pontos-fortes">Pontos Fortes</a> | 
  <a href="#-fragilidades">Fragilidades</a>
</p>

<br>

## 🚀 Tecnologias Utilizadas

As tecnologias utilizadas neste projeto incluem:

- **Node.js**: Plataforma para desenvolvimento de aplicações assíncronas e escaláveis.
- **Express.js**: Framework minimalista para construção de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL para persistência de dados.
- **Mongoose**: Biblioteca para modelagem e integração com o MongoDB.
- **JWT**: Token para autenticação de usuários.
- **BCrypt**: Hashing de senhas para segurança adicional.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Nodemon**: Ferramenta para reinício automático do servidor em desenvolvimento.

<br>

## 🛠 Estrutura da Solução

A arquitetura do projeto segue o padrão MVC (Model-View-Controller) adaptado para APIs RESTful:

- **Model**: Define os esquemas de dados com Mongoose.
- **Controller**: Contém a lógica de autenticação e manipulação de dados.
- **Route**: Define os endpoints da API e associa-os às funções do controller.
- **Middleware**: Implementa segurança com autenticação JWT.

<br>

## 💻 Funcionalidades

### Principais funcionalidades do projeto:

- **Autenticação de Usuários**:
  - Envio de credenciais (e-mail e senha) via POST.
  - Segurança com hashing (BCrypt) e tokens JWT.

- **Manipulação de Dados (CRUD)**:
  - **C**riação, **R**ealização, **U**pdate e **D**elete de registros.
  - Garantia de integridade e consistência dos dados.

- **Integração com MongoDB**:
  - Utilização do MongoDB para persistência de dados.
  - Mongoose para modelagem e abstração dos dados.

<br>

## 💪 Pontos Fortes

- **Escalabilidade**: Suporte a alto volume de requisições com Node.js e MongoDB.
- **Segurança**: Uso de JWT e BCrypt para proteger as informações sensíveis dos usuários.
- **Simplicidade e Flexibilidade**: Código organizado e fácil de manter. Integração simples com Mongoose para acesso ao banco de dados.

<br>

## ⚠ Fragilidades

- **Latência em Consultas Complexas**: MongoDB pode ser menos eficiente em operações avançadas em grandes volumes de dados.
- **Dependência de Configuração JWT**: Requer configuração adequada de segurança para evitar vulnerabilidades.
- **Manutenção de Dependências**: Atualizações regulares são essenciais para garantir compatibilidade e segurança.

<br>

## 📈 Próximos Passos

- **Publicação em Ambiente Seguro**: Configuração de HTTPS para ambiente de produção.
- **Escalabilidade com Docker**: Uso de containers para simplificar a implantação em diversos ambientes.
- **Integração com APIs Externas**: Expansão das funcionalidades com a integração de novas APIs.

<br>

## 📎 Referências

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [Docker](https://www.docker.com/)

<br>

## 🔗 Repositório GitHub

Acesse o código completo do projeto no repositório [GitHub](https://github.com/Jacquesdls/ProjetoAPI).


