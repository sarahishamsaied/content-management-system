"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_school extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_school.init(
    {
      school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "schools", key: "id" },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      final_grade: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "user_school",
    }
  );
  return user_school;
};
