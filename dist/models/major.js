"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class Major extends sequelize_1.Model {
}
Major.init({
    university_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "universities", key: "id" },
    },
    major_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "major",
});
exports.default = Major;
