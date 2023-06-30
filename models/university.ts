import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import EducationInstitution from "./education_institution";

export interface UniversityAttributes {
  education_institution_id: number;
}

class University
  extends Model<UniversityAttributes>
  implements UniversityAttributes
{
  public education_institution_id!: number;
}
University.init(
  {
    education_institution_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "education_institutions", key: "id" },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "university",
  }
);
University.belongsTo(EducationInstitution, {
  foreignKey: "education_institution_id",
  as: "education_institution",
});
export default University;
