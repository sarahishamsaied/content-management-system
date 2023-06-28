import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import Company from "./company";
import User from "./user";

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
}
UserCompany.init(
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
    sequelize: sequelizeConnection,
    modelName: "user_company",
  }
);

export default UserCompany;
