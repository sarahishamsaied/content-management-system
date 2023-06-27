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
      // define association here
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
