"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init(
    {
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      title: { type: DataTypes.STRING },
      body: { type: DataTypes.STRING, allowNull: false },
      image_url: DataTypes.STRING,
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      is_published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
