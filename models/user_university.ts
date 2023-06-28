import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";

interface UserUniversityAttributes {
  university_id: number;
  user_id: number;
  gpa?: number;
  degree:
    | "Bachelor's degree"
    | "Doctoral Degree"
    | "Master Degree"
    | "Associate Degree"
    | "Professional Degree"
    | "Bachelor of Arts"
    | "Bachelor of Science"
    | "Bachelor of Engineering"
    | "Bachelor of Education"
    | "Bachelor of Applied Sciences"
    | "Bachelor of Architecture"
    | "Bachelor of Applied Arts";
}

class UserUniversity
  extends Model<UserUniversityAttributes>
  implements UserUniversityAttributes
{
  public university_id!: number;
  public user_id!: number;
  public gpa?: number;
  public degree!:
    | "Bachelor's degree"
    | "Doctoral Degree"
    | "Master Degree"
    | "Associate Degree"
    | "Professional Degree"
    | "Bachelor of Arts"
    | "Bachelor of Science"
    | "Bachelor of Engineering"
    | "Bachelor of Education"
    | "Bachelor of Applied Sciences"
    | "Bachelor of Architecture"
    | "Bachelor of Applied Arts";
}
UserUniversity.init(
  {
    university_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "universities", key: "id" },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    gpa: DataTypes.FLOAT,
    degree: {
      type: DataTypes.ENUM(
        "Bachelor's degree",
        "Doctoral Degree",
        "Master Degree",
        "Associate Degree",
        "Professional Degree",
        "Bachelor of Arts",
        "Bachelor of Science",
        "Bachelor of Engineering",
        "Bachelor of Education",
        "Bachelor of Applied Sciences",
        "Bachelor of Architecture",
        "Bachelor of Applied Arts"
      ),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "user_university",
  }
);

export default UserUniversity;
