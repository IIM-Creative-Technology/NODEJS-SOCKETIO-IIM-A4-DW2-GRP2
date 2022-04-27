const {DataTypes} = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcryptjs");
const {Op} = require("sequelize");

const User = require(`../models/user`)(sequelize, DataTypes);

class UserService {
    async createUser(userData) {
        const newUser = User.build({...userData});

        newUser.password = bcrypt.hashSync(newUser.password, 12);

        return await newUser.save();
    }

    async searchUsers({offset = 0, limit = 20, search = ''}) {
        return await User.findAndCountAll({
            attributes: {
                exclude: ['password']
            },
            where:
                {
                    [Op.or]: {
                        email: {
                            [Op.substring]: search
                        },
                        lastName: {
                            [Op.substring]: search
                        },
                        firstName: {
                            [Op.substring]: search
                        }
                    }
                },
            offset,
            limit
        })
    }

    async deleteUser(id) {
        return await User.destroy({
            where: {
                id: id
            },
        })
    }
}

module.exports = UserService;
