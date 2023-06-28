import { Model, DataTypes, Sequelize } from "sequelize";

interface FollowAttributes {
  follower_id: number;
  following_id: number;
}

class Follow extends Model<FollowAttributes> implements FollowAttributes {
  public follower_id!: number;
  public following_id!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        follower_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
        },
        following_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
        },
      },
      {
        sequelize,
        modelName: "follow",
      }
    );
  }

  public static associate(models: any) {
    Follow.belongsTo(models.user, {
      foreignKey: "follower_id",
      as: "follower",
    });
    Follow.belongsTo(models.user, {
      foreignKey: "following_id",
      as: "following",
    });
  }
}

export default Follow;
