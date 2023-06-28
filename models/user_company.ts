import { Model, DataTypes, Sequelize } from "sequelize";

interface UserCompanyAttributes {
  user_id: number;
  company_id: number;
  position: string;
  description?: string;
  salary?: number;
  type: string;
  start_time: Date;
  end_date?: Date;
}

class UserCompany
  extends Model<UserCompanyAttributes>
  implements UserCompanyAttributes
{
  public user_id!: number;
  public company_id!: number;
  public position!: string;
  public description?: string;
  public salary?: number;
  public type!: string;
  public start_time!: Date;
  public end_date?: Date;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
        },
        company_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "companies", key: "id" },
        },
        position: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: DataTypes.STRING,
        salary: DataTypes.FLOAT,
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        start_time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_date: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "user_company",
      }
    );
  }

  public static associate(models: any) {
    UserCompany.belongsTo(models.Company, {
      foreignKey: "company_id",
      as: "company",
    });
    UserCompany.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

export default UserCompany;
