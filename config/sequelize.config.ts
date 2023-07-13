import User from "../models/user";
import { Dialect, Sequelize } from "sequelize";
const dbName = process.env.DATABASE_NAME as string;
const dbPass = process.env.DATABASE_PASSWORD as string;
const dbHost = process.env.DATABASE_HOST as string;
const dbUser = process.env.DATABASE_USER as string;
const dbPort = parseInt(process.env.DATABASE_PORT as string);
const dbDriver = process.env.DATABASE_DRIVER as Dialect;
console.log(process.env.DATABASE_NAME);
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDriver,
  port: dbPort,
  query: {
    raw: true,
  },
  dialectOptions: {
    typeCast: true, // Enable type casting
  },
});

export default sequelizeConnection;
