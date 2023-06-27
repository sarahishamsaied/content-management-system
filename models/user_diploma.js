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
      // define association here
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
