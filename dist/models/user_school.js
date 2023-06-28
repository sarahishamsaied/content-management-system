"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserSchool extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            school_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "schools", key: "id" },
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            final_grade: sequelize_1.DataTypes.FLOAT,
        }, {
            sequelize,
            modelName: "user_school",
        });
    }
    static associate(models) {
        UserSchool.belongsTo(models.school, {
            foreignKey: "school_id",
            as: "school",
        });
        UserSchool.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
    }
}
exports.default = UserSchool;
