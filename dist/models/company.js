"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Company extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            name: sequelize_1.DataTypes.STRING,
            phone_number: sequelize_1.DataTypes.STRING,
            address: sequelize_1.DataTypes.STRING,
            description: sequelize_1.DataTypes.STRING,
            img_url: sequelize_1.DataTypes.STRING,
            bio: sequelize_1.DataTypes.STRING,
            is_verified: sequelize_1.DataTypes.BOOLEAN,
            email: sequelize_1.DataTypes.STRING,
            password: sequelize_1.DataTypes.STRING,
        }, {
            sequelize,
            modelName: "Company",
        });
    }
    static associate(models) {
        Company.belongsTo(models.user_company, {
            foreignKey: "id",
            as: "user_company",
        });
    }
}
exports.default = Company;
