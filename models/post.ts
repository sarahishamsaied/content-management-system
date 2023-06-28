import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import User from "./user";
import Comment from "./comment";
import Like from "./like";
interface PostAttributes {
  author_id: number;
  title: string | null;
  body: string;
  image_url: string | null;
  slug: string;
  is_published: boolean;
}

class Post extends Model<PostAttributes> implements PostAttributes {
  public author_id!: number;
  public title!: string | null;
  public body!: string;
  public image_url!: string | null;
  public slug!: string;
  public is_published!: boolean;
}
Post.init(
  {
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    title: { type: DataTypes.STRING },
    body: { type: DataTypes.STRING, allowNull: false },
    image_url: DataTypes.STRING,
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    is_published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "post",
  }
);
Post.hasMany(Comment, {
  foreignKey: "post_id",
  as: "comments",
});
Post.hasMany(Like, {
  foreignKey: "post_id",
  as: "likes",
});
export default Post;
