"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_diploma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_diploma.belongsTo(models.diploma, {
        foreignKey: "diploma_id",
        as: "diploma",
      });
      user_diploma.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  user_diploma.init(
    {
      diploma_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "diplomas", key: "id" },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      certification_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_diploma",
    }
  );
  return user_diploma;
};
