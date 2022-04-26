const { Sequelize } = require('sequelize'); 

//const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5431/nodejspg');
const sequelize = new Sequelize('nodejspg', 'postgres', 'postgres', {
    host: 'localhost',
    port: '5431',
    dialect:'postgres',
});

module.exports = sequelize;