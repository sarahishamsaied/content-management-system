"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class UserCompany extends sequelize_1.Model {
}
UserCompany.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    company_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "companies", key: "id" },
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: sequelize_1.DataTypes.STRING,
    salary: sequelize_1.DataTypes.FLOAT,
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_date: sequelize_1.DataTypes.DATE,
}, {
    sequelize: sequelize_config_1.default,
    modelName: "user_company",
});
exports.default = UserCompany;
