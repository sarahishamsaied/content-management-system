import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";

interface TagPostAttributes {
  tag_id: number;
  post_id: number;
}

class TagPost extends Model<TagPostAttributes> implements TagPostAttributes {
  public tag_id!: number;
  public post_id!: number;
}
TagPost.init(
  {
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "tags", key: "id" },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "posts", key: "id" },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "tag_post",
  }
);

export default TagPost;
