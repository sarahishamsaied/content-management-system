"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class diploma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      diploma.belongsTo(models.education_institution, {
        foreignKey: "education_institution_id",
        as: "education_institution",
      });
      diploma.hasMany(models.user_diploma, {
        foreignKey: "diploma_id",
        as: "user_diploma",
      });
    }
  }
  diploma.init(
    {
      education_institution_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "education_institutions",
          key: "id",
        },
      },
      certificate_image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "diploma",
    }
  );
  return diploma;
};
