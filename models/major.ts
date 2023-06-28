import { Model, DataTypes, Sequelize } from "sequelize";

interface MajorAttributes {
  university_id: number;
  major_name: string;
}

class Major extends Model<MajorAttributes> implements MajorAttributes {
  public university_id!: number;
  public major_name!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        university_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "universities", key: "id" },
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
  }

  public static associate(models: any) {
    Major.belongsTo(models.university, {
      foreignKey: "university_id",
      as: "university",
    });
  }
}

export default Major;
