'use strict';
//*----My imports *------//
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
//*----My imports *------//

//*-------------Defining my user structure's model *----------------//
module.exports = function(sequelize, DataTypes){

    const User = sequelize.define('User', {
        // these are my model's attributs
        id: {
            type:   DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true
        },
        password: {
            type: DataTypes.STRING(255)
        },
        role: {
            type: DataTypes.BOOLEAN

        }
        
    }, {
        // Other model options go here
        freezeTableName: true,
        instanceMethods: {
            Hashpassword(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            confirmPassword(password) {
                return bcrypt.compare(password, this.password);
            },
            timestamps: true
        }
    });
    return User;
}
  