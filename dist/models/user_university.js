"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class UserUniversity extends sequelize_1.Model {
}
UserUniversity.init({
    university_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "universities", key: "id" },
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    gpa: sequelize_1.DataTypes.FLOAT,
    degree: {
        type: sequelize_1.DataTypes.ENUM("Bachelor's degree", "Doctoral Degree", "Master Degree", "Associate Degree", "Professional Degree", "Bachelor of Arts", "Bachelor of Science", "Bachelor of Engineering", "Bachelor of Education", "Bachelor of Applied Sciences", "Bachelor of Architecture", "Bachelor of Applied Arts"),
        allowNull: false,
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "user_university",
});
exports.default = UserUniversity;
