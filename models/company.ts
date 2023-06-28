import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import User from "./user";
import UserCompany from "./user_company";

interface CompanyAttributes {
  name?: string;
  phone_number?: string;
  address?: string;
  description?: string;
  img_url?: string;
  bio?: string;
  is_verified?: boolean;
  email?: string;
  password?: string;
}

class Company extends Model<CompanyAttributes> implements CompanyAttributes {
  public name?: string;
  public phone_number?: string;
  public address?: string;
  public description?: string;
  public img_url?: string;
  public bio?: string;
  public is_verified?: boolean;
  public email?: string;
  public password?: string;
}
Company.init(
  {
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    img_url: DataTypes.STRING,
    bio: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Company",
  }
);
Company.belongsToMany(User, {
  through: UserCompany,
});
export default Company;
