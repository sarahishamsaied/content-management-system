"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsTo(models.user_company, {
        foreignKey: "id",
        as: "user_company",
      });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.STRING,
      img_url: DataTypes.STRING,
      bio: DataTypes.STRING,
      is_vertfied: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
