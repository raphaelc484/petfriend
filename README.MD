# Pet Friend app

Construção de modelo de estudo seguindo ideia do aplicativo para adoção de animais.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
NodeJS
Docker 
Docker-compose
```

### 🔧 Instalação

Para começar será necessário instalar o banco de dados.

Use o comando abaixo para instalação do banco:

```
docker-compose up
```

para checar se o banco foi criado use o comando:

```
docker ps
```

com o banco instalado vamos criar nossas tabelas através do prisma, o comando abaixo só necessita ser usado na primeira vez que for usar o projeto:

```
npx prisma generate
```
agora use o comando abaixo para rodar as migrations criando as tabelas necessárias:

```
npx prisma migrate dev
```

caso queira ver as tabelas criadas bastar utilizar o comando:

```
npx prisma studio
```

## ⚙️ Executando os testes

Aplicação conta com testes unitários e testes E2E.

### 🔩 Teste unitários

Aqui são testadas nossos casos de uso que são a base de nossa aplicação, existem algumas rodar esses testes mas a primeira que pode ser usada é:

```
npm run test
```

Caso queira mantes os testes sempre em operação use:

```
npm run test:watch
```

Para gerar os arquivos de coverage utilize do comando:

```
test:coverage
```

### ⌨️ Testes E2E

Para rodar os testes E2E utilize do comando:

```
npm run test:e2e
```

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## 🛠️ Construído com

Ferramentas utilizadas

* [Fastify](https://www.fastify.io/) 
* [Prisma](https://www.prisma.io/) 
* [NodeJS](https://nodejs.org/) 
* [Typescript](https://www.typescriptlang.org/)
* [Vitest](https://vitest.dev/)
* [Docker](https://www.docker.com/)
* [Postgres](https://www.postgresql.org/)

## ✒️ Autores

* [Raphael Clemente Miranda](https://www.linkedin.com/in/raphaec484/)
* [rocketseat](https://www.rocketseat.com.br/)
