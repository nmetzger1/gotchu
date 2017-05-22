'use strict'

module.exports = function(sequelize, DataTypes) {
    var Helper = sequelize.define("Helper", {
            ratings: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    isNumeric: true,
                    len: [0, 5]
                }
            }

        },

        {
            classMethods: {
                associate: function (models) {
                    Helper.belongsTo(models.Post, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                    Helper.belongsTo(models.User, {
                        foreignKey: {
                            allowNull: false
                        }

                    });
                }
            }
        }
    );
    return Helper;
};