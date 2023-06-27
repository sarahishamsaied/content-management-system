"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init(
    {
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" },
      },
      body: { type: DataTypes.STRING, allowNull: false },
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
