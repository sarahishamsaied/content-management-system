import { Model, DataTypes, Sequelize } from "sequelize";

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

  public static initialize(sequelize: Sequelize) {
    this.init(
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
  }

  public static associate(models: any) {
    EducationInstitutionUser.belongsTo(models.education_institution, {
      foreignKey: "education_institution",
      as: "education_institution",
    });
    EducationInstitutionUser.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
    EducationInstitutionUser.belongsTo(models.school, {
      foreignKey: "user_school",
      as: "school",
    });
    EducationInstitutionUser.belongsTo(models.university, {
      foreignKey: "user_university",
      as: "university",
    });
    EducationInstitutionUser.belongsTo(models.diploma, {
      foreignKey: "user_diploma",
      as: "diploma",
    });
  }
}

export default EducationInstitutionUser;
