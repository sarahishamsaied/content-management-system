"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      major.belongsTo(models.university, {
        foreignKey: "university_id",
        as: "university",
      });
    }
  }
  major.init(
    {
      university_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "universities",
          key: "id",
        },
      },
      major_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "major",
    }
  );
  return major;
};
