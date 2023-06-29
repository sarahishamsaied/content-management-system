"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
const user_1 = __importDefault(require("./user"));
class Follow extends sequelize_1.Model {
}
Follow.init({
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
    sequelize: sequelize_config_1.default,
    modelName: "follow",
});
Follow.belongsTo(user_1.default, {
    foreignKey: "follower_id",
    as: "follower",
});
Follow.belongsTo(user_1.default, {
    foreignKey: "following_id",
    as: "following",
});
exports.default = Follow;
