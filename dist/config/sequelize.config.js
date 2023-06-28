"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DATABASE_NAME;
const dbPass = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbUser = process.env.DATABASE_USER;
const dbDriver = process.env.DATABASE_DRIVER;
console.log(dbName);
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDriver,
    port: 3307,
});
exports.default = sequelizeConnection;
