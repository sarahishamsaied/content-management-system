import { Model, DataTypes, Sequelize } from "sequelize";

interface TagPostAttributes {
  tag_id: number;
  post_id: number;
}

class TagPost extends Model<TagPostAttributes> implements TagPostAttributes {
  public tag_id!: number;
  public post_id!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
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
        sequelize,
        modelName: "tag_post",
      }
    );
  }

  public static associate(models: any) {
    TagPost.belongsTo(models.tag, {
      foreignKey: "tag_id",
      as: "tag",
    });
    TagPost.belongsTo(models.post, {
      foreignKey: "post_id",
      as: "post",
    });
  }
}

export default TagPost;
