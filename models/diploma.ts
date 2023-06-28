import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import EducationInstitution from "./education_institution";

interface DiplomaAttributes {
  education_institution_id: number;
  certificate_image?: string;
}

class Diploma extends Model<DiplomaAttributes> implements DiplomaAttributes {
  public education_institution_id!: number;
  public certificate_image?: string;
}
Diploma.init(
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
    sequelize: sequelizeConnection,
    modelName: "diploma",
  }
);
Diploma.belongsTo(EducationInstitution, {
  foreignKey: "education_institution_id",
  as: "education_institution",
});
export default Diploma;
