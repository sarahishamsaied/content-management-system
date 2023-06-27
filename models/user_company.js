"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_company.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      salary: DataTypes.FLOAT,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user_company",
    }
  );
  return user_company;
};
