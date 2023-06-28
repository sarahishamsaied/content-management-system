import { Model, DataTypes, Sequelize } from "sequelize";

interface TagAttributes {
  tag_name: string;
  color?: string;
  slug: string;
}

class Tag extends Model<TagAttributes> implements TagAttributes {
  public tag_name!: string;
  public color?: string;
  public slug!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        tag_name: { type: DataTypes.STRING, allowNull: false, unique: true },
        color: { type: DataTypes.STRING, defaultValue: "#000000" },
        slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      },
      {
        sequelize,
        modelName: "tag",
      }
    );
  }

  public static associate(models: any) {
    Tag.belongsToMany(models.post, {
      through: "tag_post",
      as: "posts",
      foreignKey: "tag_id",
    });
  }
}

export default Tag;
