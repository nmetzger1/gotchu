'use strict'
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
                    args: [6, 20]
                }

            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                msg: "Enter a valid email address"
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
                }
            }
        }
    );
    return User;
};