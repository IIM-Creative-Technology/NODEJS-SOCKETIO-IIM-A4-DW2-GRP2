const {Model, DataTypes} = require("sequelize");
const {sequelize} = require('../config/config');

const User = sequelize.define("user", {
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
});

(async () => {
    await sequelize.sync({force: true});
    // Code here
})();

module.exports = User;