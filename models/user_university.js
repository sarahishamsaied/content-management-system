"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_university extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_university.init(
    {
      university_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "universities", key: "id" },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      gpa: DataTypes.FLOAT,
      degree: {
        type: DataTypes.ENUM(
          "Bachelor's degree",
          "Doctoral Degree",
          "Master Degree",
          "Associate Degree",
          "Professional Degree",
          "Bachelor of Arts",
          "Bachelor of Science",
          "Bachelor of Engineering",
          "Bachelor of Education",
          "Bachelor of Applied Sciences",
          "Bachelor of Architecture",
          "Bachelor of Applied Arts"
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user_university",
    }
  );
  return user_university;
};
