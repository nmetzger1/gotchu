'use strict'

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            validate: {
                len: {
                    args: [2, 50]
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 200]
                }

            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: {
                msg: "Please provide a valid email address"
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [10]
            }
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [5]
            }
        }
    },

        {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Post);
                    User.hasMany(models.Helper);
                },
                generateHash: function (password) {
                    console.log("BCRYPT", password);
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                },
                validPassword: function (password, actualPassword) {
                    return bcrypt.compareSync(password, actualPassword);
                }
            }
        }
    );
    return User;
};