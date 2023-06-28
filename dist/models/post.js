"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Post extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
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
            sequelize,
            modelName: "post",
        });
    }
    static associate(models) {
        Post.belongsTo(models.user, {
            foreignKey: "author_id",
            as: "author",
        });
        Post.hasMany(models.comment, {
            foreignKey: "post_id",
            as: "comments",
        });
        Post.hasMany(models.like, {
            foreignKey: "post_id",
            as: "likes",
        });
    }
}
exports.default = Post;
