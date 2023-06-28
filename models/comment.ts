import { Model, DataTypes, Sequelize } from "sequelize";

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

  public static initialize(sequelize: Sequelize) {
    this.init(
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
        sequelize,
        modelName: "comment",
      }
    );
  }

  public static associate(models: any) {
    Comment.belongsTo(models.user, {
      foreignKey: "author_id",
      as: "author",
    });
    Comment.belongsTo(models.post, {
      foreignKey: "post_id",
      as: "post",
    });
  }
}

export default Comment;
