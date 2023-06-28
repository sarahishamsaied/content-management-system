"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Follow extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            follower_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            following_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
        }, {
            sequelize,
            modelName: "follow",
        });
    }
    static associate(models) {
        Follow.belongsTo(models.user, {
            foreignKey: "follower_id",
            as: "follower",
        });
        Follow.belongsTo(models.user, {
            foreignKey: "following_id",
            as: "following",
        });
    }
}
exports.default = Follow;
