"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DATABASE_NAME;
const dbPass = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbUser = process.env.DATABASE_USER;
const dbDriver = process.env.DATABASE_DRIVER;
const sequelizeConnection = new sequelize_1.Sequelize("cms_development", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3307,
});
exports.default = sequelizeConnection;
