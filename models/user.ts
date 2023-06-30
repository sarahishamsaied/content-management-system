import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import user_company from "./user_company";
import user_school from "./user_school";
import Like from "./like";
import Post from "./post";
import Comment from "./comment";
import Follow from "./follow";
import user_diploma from "./user_diploma";
import user_university from "./user_university";
import education_institution_user from "./education_institution_user";
import University from "./university";
import School from "./school";
import Diploma from "./diploma";
import EducationInstitution from "./education_institution";
import bcrypt from "bcrypt";
export interface UserAttributes {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  country?: string;
  city?: string;
  bio?: string;
  is_verified: boolean;
  is_banned: boolean;
  two_factor_enabled: boolean;
  is_admin: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public first_name!: string;
  public last_name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public country?: string;
  public city?: string;
  public bio?: string;
  public is_verified!: boolean;
  public is_banned!: boolean;
  public two_factor_enabled!: boolean;
  public is_admin!: boolean;
}
User.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    bio: DataTypes.STRING,
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    two_factor_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
    tableName: "users",
  }
);
User.beforeCreate(async (user, options) => {
  return bcrypt
    .hash(user.password, parseInt(process.env.SALT_ROUNDS as string))
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new Error(err);
    });
});
// User.hasOne(user_company, {
//   foreignKey: "user_id",
//   as: "user_company",
// });
User.hasMany(Post, {
  foreignKey: "author_id",
  as: "posts",
});
User.hasMany(Comment, {
  foreignKey: "author_id",
  as: "comments",
});
User.hasMany(Like, {
  foreignKey: "user_id",
  as: "likes",
});

User.belongsToMany(University, {
  through: user_university,
});
User.belongsToMany(School, {
  through: "user_school",
});
User.belongsToMany(Diploma, {
  through: "user_diploma",
});
User.belongsToMany(EducationInstitution, {
  through: "education_institution_user",
});
export default User;
