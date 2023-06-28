import User from "../models/user";
import { Dialect, Sequelize } from "sequelize";
const dbName = process.env.DATABASE_NAME as string;
const dbPass = process.env.DATABASE_PASSWORD as string;
const dbHost = process.env.DATABASE_HOST as string;
const dbUser = process.env.DATABASE_USER as string;
const dbDriver = process.env.DATABASE_DRIVER as Dialect;
const sequelizeConnection = new Sequelize("cms_development", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

export default sequelizeConnection;
