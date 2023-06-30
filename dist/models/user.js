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
const like_1 = __importDefault(require("./like"));
const post_1 = __importDefault(require("./post"));
const comment_1 = __importDefault(require("./comment"));
const user_university_1 = __importDefault(require("./user_university"));
const university_1 = __importDefault(require("./university"));
const school_1 = __importDefault(require("./school"));
const diploma_1 = __importDefault(require("./diploma"));
const education_institution_1 = __importDefault(require("./education_institution"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_banned: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    two_factor_enabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_admin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize_config_1.default,
    modelName: "User",
    tableName: "users",
});
User.beforeCreate((user, options) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default
        .hash(user.password, parseInt(process.env.SALT_ROUNDS))
        .then((hash) => {
        user.password = hash;
    })
        .catch((err) => {
        throw new Error(err);
    });
}));
// User.hasOne(user_company, {
//   foreignKey: "user_id",
//   as: "user_company",
// });
User.hasMany(post_1.default, {
    foreignKey: "author_id",
    as: "posts",
});
User.hasMany(comment_1.default, {
    foreignKey: "author_id",
    as: "comments",
});
User.hasMany(like_1.default, {
    foreignKey: "user_id",
    as: "likes",
});
User.belongsToMany(university_1.default, {
    through: user_university_1.default,
});
User.belongsToMany(school_1.default, {
    through: "user_school",
});
User.belongsToMany(diploma_1.default, {
    through: "user_diploma",
});
User.belongsToMany(education_institution_1.default, {
    through: "education_institution_user",
});
exports.default = User;
