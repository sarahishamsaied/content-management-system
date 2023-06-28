import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import Post from "./post";
import User from "./user";

interface CommentAttributes {
  author_id: number;
  post_id: number;
  body: string;
  image_url?: string;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public author_id!: number;
  public post_id!: number;
  public body!: string;
  public image_url?: string;
}
Comment.init(
  {
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "posts", key: "id" },
    },
    body: { type: DataTypes.STRING, allowNull: false },
    image_url: DataTypes.STRING,
  },
  {
    sequelize: sequelizeConnection,
    modelName: "comment",
  }
);
export default Comment;
