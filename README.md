<h2 align="center"> Desafio Front End </h2>

<h4 align="center"> Cliente para exibição de transferências</h4>

<p align="center">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/luisdallacqua/desafio5-frontend.svg">
    <img alt="node version" src="https://img.shields.io/static/v1?label=node&message=v.16.18.1&color=green&">
</p>

### Descrição

- Aplicação que consiste em uma tabela, que faz requisição para o [servidor](https://github.com/luisdallacqua/desafio5-backend) que irá rodar no link: [http://localhost:8080](http://localhost:8080).

- A tabela possui 4 filtros:
    - O primeiro é o id da conta para filtrar as transferências;
    - O segundo e terceiro são respectivamente a data de início e fim da filtragem;
    - O quarto e último é o nome do operador das transferências

#### Vídeo demonstrando funcionamento do cliente em conjunto com a API

[Loom video](https://www.loom.com/share/0bb2cfc2b65940a68be92ffd5506756b)

#### Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material-Ui](https://mui.com/)
- [Axios](https://www.npmjs.com/package/axios)


## Como rodar o projeto

###### Os próximos passos leva em consideração que já possui node e npm instalados no computador local. Caso não possua [instale](https://nodejs.org/en/download/) o node primeiramente.


Rode os seguintes comandos:

```bash
npm install
#and
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no browser e acesse à informação.
