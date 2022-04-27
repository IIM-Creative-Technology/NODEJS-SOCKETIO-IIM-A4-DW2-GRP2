d# NODEJS-SOCKETIO-IIM-A4-DW2-GRP2
Online version is deploy on Heroku : https://nodejs-iim-a4-grp2.herokuapp.com/
- -------------
**Table of Contents**
-------------
* [Getting Started](#getting-started)
  - [Required](#required)
  - [NPM Commands](#npm-commands)
  - [PR template](#pr-template)
  - [API documentation](#api-documentation)
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