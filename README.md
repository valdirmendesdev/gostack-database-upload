<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 06: Banco de dados e upload de arquivos no Node.js
</h3>

<blockquote align="center">“Só deseje as coisas as quais você está disposto a lutar”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/valdirmendesdev/gostack-database-upload?color=%2304D361">

  <a href="https://valdirmendes.dev">
    <img alt="Made by Valdir Mendes" src="https://img.shields.io/badge/made%20by-Valdir%20Mendes-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/valdirmendesdev/gostack-database-upload/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/valdirmendesdev/gostack-database-upload?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

Esse desafio é a continuidade do [desafio 05](https://github.com/valdirmendesdev/gostack-fundamentos-nodejs), uma aplicação de gestão de transações, utilizando Node.js, TypeScript, mas dessa vez usando banco de dados para persistir os dados com o TypeORM e upload de arquivos com o Multer!


A aplicação armazena transações financeiras de entrada e/ou saída, permite criar uma nova transação, listar as transações existentes, além de permitir a criação de novos registros no banco de dados a partir do envio de um arquivo csv.

### Rotas da aplicação

A aplicação possui as seguintes rotas:

- **`POST /transactions`**: Recebe `title`, `value`, `type`, e `category` dentro do corpo da requisição, sendo o `type` o tipo da transação, que deve ser `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Essa rota irá cadastrar uma nova transação que será armazenada dentro do banco de dados, possuindo os campos `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at` e retornará os dados.

Exemplo de corpo para criação de uma transação
```json
{
  "title": "Salário",
  "value": 3000,
  "type": "income",
  "category": "Proventos"
}
```

- **`GET /transactions`**: Retorna uma listagem com todas as transações existentes no banco de dados, junto com o valor da soma de entradas, retiradas e total do saldo disponível. Essa rota deve retornar um objeto com o seguinte formato:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation",
        "created_at": "2020-04-20T00:00:49.620Z",
        "updated_at": "2020-04-20T00:00:49.620Z"
      },
      "created_at": "2020-04-20T00:00:49.620Z",
      "updated_at": "2020-04-20T00:00:49.620Z"
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

- **`DELETE /transactions/:id`**: Deleta uma transação com o `id` presente nos parâmetros da rota;

* **`POST /transactions/import`**: Permite a importação de um arquivo com formato `.csv` contendo as mesmas informações necessárias para criação de uma transação `title`, `value`, `type`, `category`, onde cada linha do arquivo CSV gerará um novo registro no banco de dados, e por fim retorne todas as `transactions` que foram importadas. O arquivo csv, deve possuir linhas que com valores em ordem conforme o seguinte [modelo](./assets/file.csv).

## Dependências da aplicação

Para o correto funcionamento da aplicação é necessário fazer uma conexão com um banco de dados postgres. Recomendamos a seguinte configuração:

```json
{
  ...
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_desafio06",
  ...
}
```

Caso queira utilizar outras configurações, utilize o arquivo [ormconfig](./ormconfig.json) presente no projeto.

## :running: Rodando a aplicação

Para executar a aplicação, clone este repositório, entre na pasta do projeto e instale as dependências com o seguinte comando no terminal:

```bash
yarn
```

Com o postgres rodando e com o banco de dados criado, utilize o comando abaixo para criar as tabelas e relacionamentos no banco de dados.

```bash
yarn typeorm migration:run
```

Para rodar a aplicação, execute o seguinte comando no terminal:

```bash
yarn dev:server
```

Para rodar os testes automatizados, crie um banco de dados postgres com o nome **gostack_desafio06_tests** e execute o seguinte comando no terminal:

```bash
yarn test
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
