"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Diploma extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            education_institution_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "education_institutions",
                    key: "id",
                },
            },
            certificate_image: sequelize_1.DataTypes.STRING,
        }, {
            sequelize,
            modelName: "diploma",
        });
    }
    static associate(models) {
        Diploma.belongsTo(models.education_institution, {
            foreignKey: "education_institution_id",
            as: "education_institution",
        });
        Diploma.hasMany(models.user_diploma, {
            foreignKey: "diploma_id",
            as: "user_diploma",
        });
    }
}
exports.default = Diploma;
