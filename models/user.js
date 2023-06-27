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
      User.hasOne(models.user_company, {
        foreignKey: "user_id",
        as: "user_company",
      });
      User.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "posts",
      });
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        as: "comments",
      });
      User.hasMany(models.Like, {
        foreignKey: "user_id",
        as: "likes",
      });
      User.hasMany(models.Follow, {
        foreignKey: "user_id",
        as: "follows",
      });
      User.hasOne(models.user_university, {
        foreignKey: "user_id",
        as: "user_university",
      });
      User.hasOne(models.user_school, {
        foreignKey: "user_id",
        as: "user_school",
      });
      User.hasOne(models.user_diploma, {
        foreignKey: "user_id",
        as: "user_diploma",
      });
      User.hasOne(models.education_institution_user, {
        foreignKey: "user_id",
        as: "education_institution_user",
      });
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
