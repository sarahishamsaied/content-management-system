"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class education_institution_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      education_institution_user.belongsTo(models.education_institution, {
        foreignKey: "education_institution",
        as: "education_institution",
      });
      education_institution_user.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });
      education_institution_user.belongsTo(models.school, {
        foreignKey: "user_school",
        as: "school",
      });
      education_institution_user.belongsTo(models.university, {
        foreignKey: "user_university",
        as: "university",
      });
      education_institution_user.belongsTo(models.diploma, {
        foreignKey: "user_diploma",
        as: "diploma",
      });
    }
  }
  education_institution_user.init(
    {
      education_institution: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "education_institutions", key: "id" },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      user_school: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "schools", key: "id" },
      },
      user_university: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "universities", key: "id" },
      },
      user_diploma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "diplomas", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "education_institution_user",
    }
  );
  return education_institution_user;
};
