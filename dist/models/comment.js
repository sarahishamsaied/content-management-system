"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Comment extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
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
            sequelize,
            modelName: "comment",
        });
    }
    static associate(models) {
        Comment.belongsTo(models.user, {
            foreignKey: "author_id",
            as: "author",
        });
        Comment.belongsTo(models.post, {
            foreignKey: "post_id",
            as: "post",
        });
    }
}
exports.default = Comment;
