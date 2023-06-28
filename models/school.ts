import { Model, DataTypes, Sequelize } from "sequelize";

interface SchoolAttributes {
  education_institution_id: number;
}

class School extends Model<SchoolAttributes> implements SchoolAttributes {
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
        modelName: "school",
      }
    );
  }

  public static associate(models: any) {
    School.belongsTo(models.education_institution, {
      foreignKey: "education_institution_id",
      as: "education_institution",
    });
    School.hasOne(models.school_user, {
      foreignKey: "school_id",
    });
  }
}

export default School;
