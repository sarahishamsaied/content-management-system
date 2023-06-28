import { Model, DataTypes, Sequelize } from "sequelize";

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

  public static initialize(sequelize: Sequelize) {
    this.init(
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
        sequelize,
        modelName: "user_university",
      }
    );
  }

  public static associate(models: any) {
    UserUniversity.belongsTo(models.university, {
      foreignKey: "university_id",
      as: "university",
    });
    UserUniversity.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

export default UserUniversity;
