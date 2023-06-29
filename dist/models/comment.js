"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    author_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" },
    },
    body: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    image_url: sequelize_1.DataTypes.STRING,
}, {
    sequelize: sequelize_config_1.default,
    modelName: "comment",
});
exports.default = Comment;
