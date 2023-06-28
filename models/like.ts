import { Model, DataTypes, Sequelize } from "sequelize";

interface LikeAttributes {
  user_id: number;
  post_id: number;
}

class Like extends Model<LikeAttributes> implements LikeAttributes {
  public user_id!: number;
  public post_id!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
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
        sequelize,
        modelName: "like",
      }
    );
  }

  public static associate(models: any) {
    Like.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user",
    });
    Like.belongsTo(models.post, {
      foreignKey: "post_id",
      as: "post",
    });
  }
}

export default Like;
