"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DATABASE_NAME;
const dbPass = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbUser = process.env.DATABASE_USER;
const dbPort = parseInt(process.env.DATABASE_PORT);
const dbDriver = process.env.DATABASE_DRIVER;
console.log(process.env.DATABASE_NAME);
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
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
exports.default = sequelizeConnection;
