"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class EducationInstitutionUser extends sequelize_1.Model {
}
EducationInstitutionUser.init({
    education_institution: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "education_institutions", key: "id" },
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    user_school: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "schools", key: "id" },
    },
    user_university: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "universities", key: "id" },
    },
    user_diploma: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "diplomas", key: "id" },
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "education_institution_user",
});
exports.default = EducationInstitutionUser;
