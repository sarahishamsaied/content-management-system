"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class University extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            education_institution_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "education_institutions", key: "id" },
            },
        }, {
            sequelize,
            modelName: "university",
        });
    }
    static associate(models) {
        University.belongsTo(models.education_institution, {
            foreignKey: "education_institution_id",
            as: "education_institution",
        });
        University.hasMany(models.major, {
            foreignKey: "university_id",
            as: "major",
        });
        University.hasOne(models.user_university, {
            foreignKey: "university_id",
            as: "user_university",
        });
    }
}
exports.default = University;
