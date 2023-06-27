"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class university extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      university.belongsTo(models.education_institution, {
        foreignKey: "education_institution_id",
        as: "education_institution",
      });
      university.hasMany(models.major, {
        foreignKey: "university_id",
        as: "major",
      });
      university.hasOne(models.user_university, {
        foreignKey: "university_id",
        as: "user_university",
      });
    }
  }
  university.init(
    {
      education_institution_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "education_institutions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "university",
    }
  );
  return university;
};
