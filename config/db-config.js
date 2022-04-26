const { Sequelize } = require('sequelize'); // importing sequelize


//*----define your db connection *------//

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5431/nodejspg');

//------* define your db connection *------//

//------* testing the connection to the db *------//

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
};

//------* define your db connection *------//