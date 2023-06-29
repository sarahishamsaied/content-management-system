"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class EducationInstitution extends sequelize_1.Model {
}
EducationInstitution.init({
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    phone_number: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    is_verified: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false },
    address: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: sequelize_1.DataTypes.STRING,
    website: sequelize_1.DataTypes.STRING,
    img_url: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_config_1.default,
    modelName: "Education_institution",
});
exports.default = EducationInstitution;
