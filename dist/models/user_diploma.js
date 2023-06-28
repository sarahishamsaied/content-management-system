"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserDiploma extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            diploma_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "diplomas", key: "id" },
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            certification_image: sequelize_1.DataTypes.STRING,
        }, {
            sequelize,
            modelName: "user_diploma",
        });
    }
    static associate(models) {
        UserDiploma.belongsTo(models.diploma, {
            foreignKey: "diploma_id",
            as: "diploma",
        });
        UserDiploma.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
    }
}
exports.default = UserDiploma;
