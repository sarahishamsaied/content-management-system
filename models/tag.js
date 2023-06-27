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
      // define association here
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
