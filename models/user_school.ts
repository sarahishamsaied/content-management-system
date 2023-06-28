import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";

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
}
UserSchool.init(
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
    sequelize: sequelizeConnection,
    modelName: "user_school",
  }
);

export default UserSchool;
