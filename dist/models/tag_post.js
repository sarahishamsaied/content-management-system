"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
class TagPost extends sequelize_1.Model {
}
TagPost.init({
    tag_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "tags", key: "id" },
    },
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" },
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "tag_post",
});
exports.default = TagPost;
