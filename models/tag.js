"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tag.belongsToMany(models.post, {
        through: "tag_post",
        as: "posts",
        foreignKey: "tag_id",
      });
    }
  }
  tag.init(
    {
      tag_name: { type: DataTypes.STRING, allowNull: false, unique: true },
      color: { type: DataTypes.STRING, defaultValue: "#000000" },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "tag",
    }
  );
  return tag;
};
