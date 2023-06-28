"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserUniversity extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            university_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "universities", key: "id" },
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            gpa: sequelize_1.DataTypes.FLOAT,
            degree: {
                type: sequelize_1.DataTypes.ENUM("Bachelor's degree", "Doctoral Degree", "Master Degree", "Associate Degree", "Professional Degree", "Bachelor of Arts", "Bachelor of Science", "Bachelor of Engineering", "Bachelor of Education", "Bachelor of Applied Sciences", "Bachelor of Architecture", "Bachelor of Applied Arts"),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "user_university",
        });
    }
    static associate(models) {
        UserUniversity.belongsTo(models.university, {
            foreignKey: "university_id",
            as: "university",
        });
        UserUniversity.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
    }
}
exports.default = UserUniversity;
