"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Education_institution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Education_institution.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      phone_number: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      is_verified: { type: DataTypes.BOOLEAN, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING,
      website: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Education_institution",
    }
  );
  return Education_institution;
};
