import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import User from "./user";

interface FollowAttributes {
  follower_id: number;
  following_id: number;
}

class Follow extends Model<FollowAttributes> implements FollowAttributes {
  public follower_id!: number;
  public following_id!: number;
}
Follow.init(
  {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "follow",
  }
);
Follow.belongsTo(User, {
  foreignKey: "follower_id",
  as: "follower",
});
Follow.belongsTo(User, {
  foreignKey: "following_id",
  as: "following",
});
export default Follow;
