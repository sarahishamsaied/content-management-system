import { Model, DataTypes, Sequelize } from "sequelize";

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

  public static initialize(sequelize: Sequelize) {
    this.init(
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
        sequelize,
        modelName: "post",
      }
    );
  }

  public static associate(models: any) {
    Post.belongsTo(models.user, {
      foreignKey: "author_id",
      as: "author",
    });
    Post.hasMany(models.comment, {
      foreignKey: "post_id",
      as: "comments",
    });
    Post.hasMany(models.like, {
      foreignKey: "post_id",
      as: "likes",
    });
  }
}

export default Post;
