"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
const comment_1 = __importDefault(require("./comment"));
const like_1 = __importDefault(require("./like"));
class Post extends sequelize_1.Model {
}
Post.init({
    author_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    title: { type: sequelize_1.DataTypes.STRING },
    body: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    image_url: sequelize_1.DataTypes.STRING,
    slug: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    is_published: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "post",
});
Post.hasMany(comment_1.default, {
    foreignKey: "post_id",
    as: "comments",
});
Post.hasMany(like_1.default, {
    foreignKey: "post_id",
    as: "likes",
});
exports.default = Post;
