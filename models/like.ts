import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import User from "./user";
import Post from "./post";

interface LikeAttributes {
  user_id: number;
  post_id: number;
}

class Like extends Model<LikeAttributes> implements LikeAttributes {
  public user_id!: number;
  public post_id!: number;
}
Like.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "posts", key: "id" },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "like",
  }
);
export default Like;
