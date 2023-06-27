"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      like.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });
      like.belongsTo(models.post, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  like.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "like",
    }
  );
  return like;
};
