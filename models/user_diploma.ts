import { Model, DataTypes, Sequelize } from "sequelize";

interface UserDiplomaAttributes {
  diploma_id: number;
  user_id: number;
  certification_image?: string;
}

class UserDiploma
  extends Model<UserDiplomaAttributes>
  implements UserDiplomaAttributes
{
  public diploma_id!: number;
  public user_id!: number;
  public certification_image?: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        diploma_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "diplomas", key: "id" },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
        },
        certification_image: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "user_diploma",
      }
    );
  }

  public static associate(models: any) {
    UserDiploma.belongsTo(models.diploma, {
      foreignKey: "diploma_id",
      as: "diploma",
    });
    UserDiploma.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

export default UserDiploma;
