"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Major extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            university_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "universities", key: "id" },
            },
            major_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "major",
        });
    }
    static associate(models) {
        Major.belongsTo(models.university, {
            foreignKey: "university_id",
            as: "university",
        });
    }
}
exports.default = Major;
