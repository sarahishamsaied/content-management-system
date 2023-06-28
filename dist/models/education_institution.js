"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class EducationInstitution extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
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
            sequelize,
            modelName: "Education_institution",
        });
    }
    static associate(models) {
        // Define associations here if needed
    }
}
exports.default = EducationInstitution;
