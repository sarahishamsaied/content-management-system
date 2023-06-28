"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class EducationInstitutionUser extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
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
            sequelize,
            modelName: "education_institution_user",
        });
    }
    static associate(models) {
        EducationInstitutionUser.belongsTo(models.education_institution, {
            foreignKey: "education_institution",
            as: "education_institution",
        });
        EducationInstitutionUser.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
        EducationInstitutionUser.belongsTo(models.school, {
            foreignKey: "user_school",
            as: "school",
        });
        EducationInstitutionUser.belongsTo(models.university, {
            foreignKey: "user_university",
            as: "university",
        });
        EducationInstitutionUser.belongsTo(models.diploma, {
            foreignKey: "user_diploma",
            as: "diploma",
        });
    }
}
exports.default = EducationInstitutionUser;
