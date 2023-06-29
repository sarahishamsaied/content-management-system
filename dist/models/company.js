"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
const user_1 = __importDefault(require("./user"));
const user_company_1 = __importDefault(require("./user_company"));
class Company extends sequelize_1.Model {
}
Company.init({
    name: sequelize_1.DataTypes.STRING,
    phone_number: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING,
    img_url: sequelize_1.DataTypes.STRING,
    bio: sequelize_1.DataTypes.STRING,
    is_verified: sequelize_1.DataTypes.BOOLEAN,
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_config_1.default,
    modelName: "Company",
});
Company.belongsToMany(user_1.default, {
    through: user_company_1.default,
});
exports.default = Company;
