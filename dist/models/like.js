"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Like extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            post_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: "posts", key: "id" },
            },
        }, {
            sequelize,
            modelName: "like",
        });
    }
    static associate(models) {
        Like.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
        Like.belongsTo(models.post, {
            foreignKey: "post_id",
            as: "post",
        });
    }
}
exports.default = Like;
