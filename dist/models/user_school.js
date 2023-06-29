"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class UserSchool extends sequelize_1.Model {
}
UserSchool.init({
    school_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "schools", key: "id" },
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    final_grade: sequelize_1.DataTypes.FLOAT,
}, {
    sequelize: sequelize_config_1.default,
    modelName: "user_school",
});
exports.default = UserSchool;
