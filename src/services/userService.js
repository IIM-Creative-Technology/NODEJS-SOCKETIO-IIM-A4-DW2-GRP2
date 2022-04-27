const { DataTypes } = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcryptjs");

const User = require(`../models/user`)(sequelize, DataTypes);

class UserService {
  async createUser(userData) {
    const newUser = User.build({ ...userData });

    newUser.password = bcrypt.hashSync(newUser.password, 12);

    return await newUser.save();
  }
}

module.exports = UserService;
