require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: "nodejs-pg",
    port: process.env.DB_PORT,
    dialect: 'postgres'
});

module.exports = {sequelize};