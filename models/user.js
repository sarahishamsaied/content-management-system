"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      first_name: {
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      bio: DataTypes.STRING,
      is_verified: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_banned: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      two_factor_enabled: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_admin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
