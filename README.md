<p>
  <h1>Teste Dasa</h1> 
</p>

## Descrição

Construção de Api para manutenção de laboratório e exames

## Arquitetura

1. NestJS
2. Postgresql

## Instalação

```bash
$ yarn install
```

## Execução

1. Criar arquivo .env na raíz do projeto com as variáveis de ambiente baseadas no arquivo .env.sample

2. Criar base de dados no Postgres com mesmo nome utilizado na variável DATABASE_DB

3. Executar comando abaixo:

```bash
$ yarn start:prod
```

## Execução Docker

1. Criar arquivo .env na raíz do projeto com as variáveis de ambiente baseadas no arquivo .env.sample, apenas ajustando a variável de ambiente DATABASE_HOST para o valor abaixo:

```bash
DATABASE_HOST=db
```

2. Executar comandos abaixo:

```bash
$ docker build -t teste-dasaexp-dev-backend/dockernode .

$ docker-compose up -d
```

## Testes integrados

1. Criar arquivo .env na raíz do projeto com as variáveis de ambiente baseadas no arquivo .env.sample

2. Criar base de dados no Postgres com mesmo nome utilizado na variável DATABASE_DB_TEST

3. Executar comando abaixo:

```bash
$ yarn test:e2e
```

## Documentação da Api (Swagger)

Ao rodar localmente a Api, visitar url abaixo:

http://localhost:3000/api

Ou, visitando ambiente Node hospedado no Heroku

https://teste-backend-dasa.herokuapp.com/api

## Ambiente de hospedagem (Heroku)

Rotas hospedadas no ambiente abaixo:

```bash
https://teste-backend-dasa.herokuapp.com
```
