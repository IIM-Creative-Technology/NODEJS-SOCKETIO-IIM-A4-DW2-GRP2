# NODEJS-SOCKETIO-IIM-A4-DW2-GRP2


## Cours Node.js avec la classe A4 IWM M2



<!-- TABLE OF CONTENT -->



<details open="open">
    <summary>
        <h2 style="display: inline-block">
            TABLE DES MATIÈRES
        <h2>
    </summary>
    <ol>
        <li>
            <a href="#faire-son-server">
                Faire son serveur
            </a>
        </li>
        <li>
            <a href="#faire-son-server">
                Fichier de migration
            </a>
        </li>
    </ol>
</details>

# Prérequis


-ORDINATEUR
-WORDPAD
-NODEJS VERSION 18


# Faire son serveur


Définition des constantes globales de l'application.

/*---- VARIABLE GLOBAL ------*/
```js
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

/*---- Création du serveur  ------*/

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

/*---- Lancement du serveur  ------*/

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
/*---- Lancement du serveur  ------*/


## Créer sa migration

Installer le cli de sequelize

npm install --save-dev sequelize-cli


#Générer son modèle

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

Ceci créera un modèle avec les attributs données dans la commande (optionnel)


# Générer fichier de migration

npx sequelize-cli db:migrate
 
Une migration est effectué dans la base de donnée créé 

