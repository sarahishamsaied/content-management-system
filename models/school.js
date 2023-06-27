"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class school extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  school.init(
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
      modelName: "school",
    }
  );
  return school;
};
