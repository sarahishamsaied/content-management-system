"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    is_published: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "post",
});
Post.beforeCreate((post, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!post.title) {
        post.title = post.body.substring(0, 20);
    }
    post.is_published = true;
}));
Post.hasMany(comment_1.default, {
    foreignKey: "post_id",
    as: "comments",
});
Post.hasMany(like_1.default, {
    foreignKey: "post_id",
    as: "likes",
});
exports.default = Post;
