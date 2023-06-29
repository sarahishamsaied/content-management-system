"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
const education_institution_1 = __importDefault(require("./education_institution"));
class School extends sequelize_1.Model {
}
School.init({
    education_institution_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "education_institutions", key: "id" },
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "school",
});
School.belongsTo(education_institution_1.default, {
    foreignKey: "education_institution_id",
    as: "education_institution",
});
exports.default = School;
