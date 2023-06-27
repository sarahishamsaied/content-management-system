"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tag_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tag_post.belongsTo(models.tag, {
        foreignKey: "tag_id",
        as: "tag",
      });
      tag_post.belongsTo(models.post, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  tag_post.init(
    {
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "tags", key: "id" },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "tag_post",
    }
  );
  return tag_post;
};
