const {DataTypes} = require("sequelize");
const sequelize = require("../models").sequelize;
const bcrypt = require("bcryptjs");
const {Op} = require("sequelize");

const User = require(`../models/user`)(sequelize, DataTypes);

class UserService {

    async createUser(userData) {
        const newUser = User.build({...userData});
        newUser.password = bcrypt.hashSync(newUser.password, 12);

        const result = await newUser.save();
        result.password = undefined;
        return result;
    }

    async findUserById(id){
        return await User.findOne({
            attributes: {
                exclude: 'password'
            },
            where: {
                id
            }
        });
    }

    async findUserByEmail(email){
        return await User.findOne({
            where: {
                email
            }
        });
    }

    async searchUsers({offset = 0, limit = 20, search = ''}) {
        return await User.findAndCountAll({
            attributes: {
                exclude: 'password'
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

    async updateUser(user, patch) {
        user.set({
            ...patch
        });

        if(patch.password){
            user.password  = bcrypt.hashSync(user.password, 12);
        }

        return await user.save()
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
