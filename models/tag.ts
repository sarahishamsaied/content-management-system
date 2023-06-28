import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";
import Post from "./post";

interface TagAttributes {
  tag_name: string;
  color?: string;
  slug: string;
}

class Tag extends Model<TagAttributes> implements TagAttributes {
  public tag_name!: string;
  public color?: string;
  public slug!: string;
}
Tag.init(
  {
    tag_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    color: { type: DataTypes.STRING, defaultValue: "#000000" },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "tag",
  }
);
Tag.belongsToMany(Post, {
  through: "tag_post",
  as: "posts",
  foreignKey: "tag_id",
});
export default Tag;
