"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class School extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            education_institution_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "education_institutions", key: "id" },
            },
        }, {
            sequelize,
            modelName: "school",
        });
    }
    static associate(models) {
        School.belongsTo(models.education_institution, {
            foreignKey: "education_institution_id",
            as: "education_institution",
        });
        School.hasOne(models.school_user, {
            foreignKey: "school_id",
        });
    }
}
exports.default = School;
