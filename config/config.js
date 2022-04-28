require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres"
  },
  test: {
    uri: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    },
    dialect: "postgres",
    use_env_variable: 'DATABASE_URL'
  },
};