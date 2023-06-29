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
  is_published: boolean;
}

class Post extends Model<PostAttributes> implements PostAttributes {
  public author_id!: number;
  public title!: string | null;
  public body!: string;
  public image_url!: string | null;
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
    is_published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "post",
  }
);
Post.beforeCreate(async (post, options) => {
  if (!post.title) {
    post.title = post.body.substring(0, 20);
  }
  post.is_published = true;
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  as: "comments",
});
Post.hasMany(Like, {
  foreignKey: "post_id",
  as: "likes",
});
export default Post;
