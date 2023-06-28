"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TagPost extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
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
            sequelize,
            modelName: "tag_post",
        });
    }
    static associate(models) {
        TagPost.belongsTo(models.tag, {
            foreignKey: "tag_id",
            as: "tag",
        });
        TagPost.belongsTo(models.post, {
            foreignKey: "post_id",
            as: "post",
        });
    }
}
exports.default = TagPost;
