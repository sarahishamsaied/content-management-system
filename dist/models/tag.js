"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Tag extends sequelize_1.Model {
    static initialize(sequelize) {
        this.init({
            tag_name: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
            color: { type: sequelize_1.DataTypes.STRING, defaultValue: "#000000" },
            slug: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
        }, {
            sequelize,
            modelName: "tag",
        });
    }
    static associate(models) {
        Tag.belongsToMany(models.post, {
            through: "tag_post",
            as: "posts",
            foreignKey: "tag_id",
        });
    }
}
exports.default = Tag;
