import { Model, DataTypes, Sequelize } from "sequelize";

interface UserAttributes {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  country?: string;
  city?: string;
  bio?: string;
  is_verified: string;
  is_banned: string;
  two_factor_enabled: string;
  is_admin: string;
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
  public is_verified!: string;
  public is_banned!: string;
  public two_factor_enabled!: string;
  public is_admin!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
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
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_banned: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        two_factor_enabled: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_admin: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }

  public static associate(models: any) {
    User.hasOne(models.user_company, {
      foreignKey: "user_id",
      as: "user_company",
    });
    User.hasMany(models.Post, {
      foreignKey: "user_id",
      as: "posts",
    });
    User.hasMany(models.Comment, {
      foreignKey: "user_id",
      as: "comments",
    });
    User.hasMany(models.Like, {
      foreignKey: "user_id",
      as: "likes",
    });
    User.hasMany(models.Follow, {
      foreignKey: "user_id",
      as: "follows",
    });
    User.hasOne(models.user_university, {
      foreignKey: "user_id",
      as: "user_university",
    });
    User.hasOne(models.user_school, {
      foreignKey: "user_id",
      as: "user_school",
    });
    User.hasOne(models.user_diploma, {
      foreignKey: "user_id",
      as: "user_diploma",
    });
    User.hasOne(models.education_institution_user, {
      foreignKey: "user_id",
      as: "education_institution_user",
    });
  }
}

export default User;
