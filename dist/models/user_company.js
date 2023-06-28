"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class UserCompany extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            company_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "companies", key: "id" },
            },
            position: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: sequelize_1.DataTypes.STRING,
            salary: sequelize_1.DataTypes.FLOAT,
            type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            start_time: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            end_date: sequelize_1.DataTypes.DATE,
        }, {
            sequelize,
            modelName: "user_company",
        });
    }
    static associate(models) {
        UserCompany.belongsTo(models.Company, {
            foreignKey: "company_id",
            as: "company",
        });
        UserCompany.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
    }
}
exports.default = UserCompany;
