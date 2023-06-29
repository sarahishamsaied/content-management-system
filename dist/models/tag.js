"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
const post_1 = __importDefault(require("./post"));
class Tag extends sequelize_1.Model {
}
Tag.init({
    tag_name: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    color: { type: sequelize_1.DataTypes.STRING, defaultValue: "#000000" },
    slug: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "tag",
});
Tag.belongsToMany(post_1.default, {
    through: "tag_post",
    as: "posts",
    foreignKey: "tag_id",
});
exports.default = Tag;
