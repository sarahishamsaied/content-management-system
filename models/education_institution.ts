import { Model, DataTypes, Sequelize } from "sequelize";

interface EducationInstitutionAttributes {
  name: string;
  phone_number: string;
  country: string;
  city: string;
  is_verified: boolean;
  address: string;
  description?: string;
  website?: string;
  img_url?: string;
}

class EducationInstitution
  extends Model<EducationInstitutionAttributes>
  implements EducationInstitutionAttributes
{
  public name!: string;
  public phone_number!: string;
  public country!: string;
  public city!: string;
  public is_verified!: boolean;
  public address!: string;
  public description?: string;
  public website?: string;
  public img_url?: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        phone_number: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        is_verified: { type: DataTypes.BOOLEAN, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.STRING,
        website: DataTypes.STRING,
        img_url: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Education_institution",
      }
    );
  }

  public static associate(models: any) {
    // Define associations here if needed
  }
}

export default EducationInstitution;
