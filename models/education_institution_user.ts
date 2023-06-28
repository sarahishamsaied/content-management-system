import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";

interface EducationInstitutionUserAttributes {
  education_institution: number;
  user_id: number;
  user_school: number;
  user_university: number;
  user_diploma: number;
}

class EducationInstitutionUser
  extends Model<EducationInstitutionUserAttributes>
  implements EducationInstitutionUserAttributes
{
  public education_institution!: number;
  public user_id!: number;
  public user_school!: number;
  public user_university!: number;
  public user_diploma!: number;
}

EducationInstitutionUser.init(
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
    sequelize: sequelizeConnection,
    modelName: "education_institution_user",
  }
);
export default EducationInstitutionUser;
