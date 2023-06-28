"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_config_1 = __importDefault(require("../config/sequelize.config"));
const user_company_1 = __importDefault(require("./user_company"));
const user_school_1 = __importDefault(require("./user_school"));
const like_1 = __importDefault(require("./like"));
const post_1 = __importDefault(require("./post"));
const comment_1 = __importDefault(require("./comment"));
const follow_1 = __importDefault(require("./follow"));
const user_diploma_1 = __importDefault(require("./user_diploma"));
const user_university_1 = __importDefault(require("./user_university"));
const education_institution_user_1 = __importDefault(require("./education_institution_user"));
class User extends sequelize_1.Model {
}
User.init({
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: sequelize_1.DataTypes.STRING,
    city: sequelize_1.DataTypes.STRING,
    bio: sequelize_1.DataTypes.STRING,
    is_verified: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_banned: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    two_factor_enabled: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_admin: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "User",
});
User.hasOne(user_company_1.default, {
    foreignKey: "user_id",
    as: "user_company",
});
User.hasMany(post_1.default, {
    foreignKey: "user_id",
    as: "posts",
});
User.hasMany(comment_1.default, {
    foreignKey: "user_id",
    as: "comments",
});
User.hasMany(like_1.default, {
    foreignKey: "user_id",
    as: "likes",
});
User.hasMany(follow_1.default, {
    foreignKey: "user_id",
    as: "follows",
});
User.hasOne(user_university_1.default, {
    foreignKey: "user_id",
    as: "user_university",
});
User.hasOne(user_school_1.default, {
    foreignKey: "user_id",
    as: "user_school",
});
User.hasOne(user_diploma_1.default, {
    foreignKey: "user_id",
    as: "user_diploma",
});
User.hasOne(education_institution_user_1.default, {
    foreignKey: "user_id",
    as: "education_institution_user",
});
exports.default = User;
