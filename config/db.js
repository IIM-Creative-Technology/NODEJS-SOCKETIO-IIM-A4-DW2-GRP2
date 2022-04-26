const { Sequelize } = require('sequelize'); 

//const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5431/nodejspg');
const sequelize = new Sequelize('nodejspg', 'postgres', 'postgres', {
    host: 'nodejs-pg',
    port: '5432',
    dialect:'postgres',
});

module.exports = sequelize;