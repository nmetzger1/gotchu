'use strict'

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 100]
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 500]
                }
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        hasHelpers: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },

        {
            classMethods: {
                associate: function (models) {
                    Post.belongsTo(models.User, {
                        foreignKey: {
                            allowNull: false
                        }

                    });
                }
            }
        }
    );
    return Post;
};