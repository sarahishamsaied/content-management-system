import { Model, DataTypes, Sequelize } from "sequelize";

interface UniversityAttributes {
  education_institution_id: number;
}

class University
  extends Model<UniversityAttributes>
  implements UniversityAttributes
{
  public education_institution_id!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        education_institution_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "education_institutions", key: "id" },
        },
      },
      {
        sequelize,
        modelName: "university",
      }
    );
  }

  public static associate(models: any) {
    University.belongsTo(models.education_institution, {
      foreignKey: "education_institution_id",
      as: "education_institution",
    });
    University.hasMany(models.major, {
      foreignKey: "university_id",
      as: "major",
    });
    University.hasOne(models.user_university, {
      foreignKey: "university_id",
      as: "user_university",
    });
  }
}

export default University;
