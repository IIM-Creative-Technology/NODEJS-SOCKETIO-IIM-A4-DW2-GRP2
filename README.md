d# NODEJS-SOCKETIO-IIM-A4-DW2-GRP2
Online version is deploy on Heroku : https://nodejs-iim-a4-grp2.herokuapp.com/

---

## **Table of Contents**

- [Getting Started](#getting-started)
  - [Required](#required)
  - [NPM Commands](#npm-commands)
  - [PR template](#pr-template)
  - [API documentation](#api-documentation)
  - [Sequelize (Database)](#sequelize-database)


### Getting Started

#### Required

- docker (https://www.docker.com/get-started/)

Install node packages of the project by using [`yarn`](https://yarnpkg.com/) or [`npm`](https://www.npmjs.com/):

```bash
npm install
```

#### NPM commands

All commands has to be done in the root folder of the project.

- Starting the project by using `$ npm start`

```bash
npm start
```

- Starting all the units test by using `$ npm test`

```bash
npm test
```

- Build docker

```bash
docker-compose up --build
```

#### PR template

```text
| Q             | A
| ------------- | ---
| Branch?       | branch targeted -> current branch
| Bug fix?      | yes/no
| New feature?  | yes/no
| Deprecations? | yes/no
| Tickets       | Ticket #/no (if from ticket specify wich one)
```


#### API documentation

A swagger file is add to this project with all the api documentation to access it go to :
```bash
localhost/PORT/docs/swagger
```
```
localhost:PORT/docs/swagger
```

#### Sequelize database

The database is postgresql and is handle on the project with [Sequelize ORM](https://sequelize.org/)

##### Create a model

`npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string,password:string`

This will create a class in "models" folder and a migration to add the table in the database

##### Migrate the database

`npx sequelize-cli db:migrate`

#### Create seeders

This will be of use to fill your database with data, fixtures for exemple.

`npx sequelize-cli seed:generate --name seed_name`

#### Run seeders

This will add the seeders into the database

`npx sequelize-cli db:seed:all`
