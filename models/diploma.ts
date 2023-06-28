import { Model, DataTypes, Sequelize } from "sequelize";

interface DiplomaAttributes {
  education_institution_id: number;
  certificate_image?: string;
}

class Diploma extends Model<DiplomaAttributes> implements DiplomaAttributes {
  public education_institution_id!: number;
  public certificate_image?: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
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
        sequelize,
        modelName: "diploma",
      }
    );
  }

  public static associate(models: any) {
    Diploma.belongsTo(models.education_institution, {
      foreignKey: "education_institution_id",
      as: "education_institution",
    });
    Diploma.hasMany(models.user_diploma, {
      foreignKey: "diploma_id",
      as: "user_diploma",
    });
  }
}

export default Diploma;
