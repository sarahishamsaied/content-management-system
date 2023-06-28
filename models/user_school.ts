import { Model, DataTypes, Sequelize } from "sequelize";

interface UserSchoolAttributes {
  school_id: number;
  user_id: number;
  final_grade?: number;
}

class UserSchool
  extends Model<UserSchoolAttributes>
  implements UserSchoolAttributes
{
  public school_id!: number;
  public user_id!: number;
  public final_grade?: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        school_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "schools", key: "id" },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
        },
        final_grade: DataTypes.FLOAT,
      },
      {
        sequelize,
        modelName: "user_school",
      }
    );
  }

  public static associate(models: any) {
    UserSchool.belongsTo(models.school, {
      foreignKey: "school_id",
      as: "school",
    });
    UserSchool.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

export default UserSchool;
