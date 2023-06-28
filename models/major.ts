import { Model, DataTypes, Sequelize } from "sequelize";
import sequelizeConnection from "../config/sequelize.config";

interface MajorAttributes {
  university_id: number;
  major_name: string;
}

class Major extends Model<MajorAttributes> implements MajorAttributes {
  public university_id!: number;
  public major_name!: string;
}
Major.init(
  {
    university_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "universities", key: "id" },
    },
    major_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "major",
  }
);
export default Major;
