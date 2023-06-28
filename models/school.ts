import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import EducationInstitution from "./education_institution";

interface SchoolAttributes {
  education_institution_id: number;
}

class School extends Model<SchoolAttributes> implements SchoolAttributes {
  public education_institution_id!: number;
}
School.init(
  {
    education_institution_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "education_institutions", key: "id" },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "school",
  }
);
School.belongsTo(EducationInstitution, {
  foreignKey: "education_institution_id",
  as: "education_institution",
});
export default School;
