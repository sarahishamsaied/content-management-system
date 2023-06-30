import sequelizeConnection from "../../../config/sequelize.config";
import Diploma from "../../../models/diploma";
import EducationInstitution from "../../../models/education_institution";
import { DiplomaAttributes } from "../../types/educationalInstitutions";

export default class DiplomaStore {
  async index(): Promise<Diploma[]> {
    try {
      const diploma = await Diploma.findAll({});
      return diploma;
    } catch (err) {
      throw new Error(`Could not find diplomas. Error: ${err}`);
    }
  }
  async show(id: number): Promise<Diploma> {
    try {
      const diploma = await Diploma.findByPk(id, {
        include: [
          {
            model: EducationInstitution,
            as: "education_institution",
          },
        ],
      });
      if (!diploma) throw new Error(`Could not find diploma ${id}`);
      return diploma as Diploma;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(diploma: DiplomaAttributes): Promise<DiplomaAttributes> {
    try {
      const educationInstitution = await EducationInstitution.create(diploma);
      const id = educationInstitution.get("id") as number;
      const newDiploma = await Diploma.create({
        ...diploma,
        education_institution_id: id,
      });
      const newDiplomaFullAttributes = {
        ...newDiploma.get(),
        ...educationInstitution.get(),
        id: newDiploma.education_institution_id,
      };
      return newDiplomaFullAttributes as DiplomaAttributes;
    } catch (error) {
      throw new Error(`Error creati ng diploma: ${error}`);
    }
  }
  async update(
    id: number,
    diplomaData: Partial<DiplomaAttributes>
  ): Promise<DiplomaAttributes> {
    const t = await sequelizeConnection.transaction();
    try {
      // Find the university by its ID within a transaction
      const diploma = await Diploma.findByPk(id, { transaction: t });

      // Throw an error if the diploma is not found
      if (!diploma) {
        throw new Error(`Couldn't find diploma ${id}`);
      }

      // Find the associated education institution within the same transaction
      const educationInstitution = await EducationInstitution.findByPk(
        diploma.education_institution_id,
        { transaction: t }
      );

      // Throw an error if the education institution is not found
      if (!educationInstitution) {
        throw new Error(
          `Couldn't find education institution ${diploma.education_institution_id}`
        );
      }

      // Update the diploma and education institution with the provided data within the transaction
      await diploma.update(diplomaData, { transaction: t });
      await educationInstitution.update(diplomaData, { transaction: t });

      // Commit the transaction
      await t.commit();

      // Combine the updated diploma and education institution attributes
      const diplomaFullAttributes = {
        ...diploma.get(),
        ...educationInstitution.get(),
        id: diploma.education_institution_id,
      };

      return diplomaFullAttributes;
    } catch (error) {
      // Rollback the transaction in case of an error
      await t.rollback();
      throw new Error(`Couldn't update university ${id}. ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    const t = await sequelizeConnection.transaction();
    try {
      // Find the diploma by its ID within a transaction
      const diploma = await Diploma.findByPk(id, { transaction: t });

      // Throw an error if the university is not found
      if (!diploma) {
        throw new Error(`Couldn't find diploma ${id}`);
      }

      // Find the associated education institution within the same transaction
      const educationInstitution = await EducationInstitution.findByPk(
        diploma.education_institution_id,
        { transaction: t }
      );

      // Throw an error if the education institution is not found
      if (!educationInstitution) {
        throw new Error(
          `Couldn't find education institution ${diploma.education_institution_id}`
        );
      }

      // Delete the diploma and education institution within the transaction
      await diploma.destroy({ transaction: t });
      await educationInstitution.destroy({ transaction: t });

      // Commit the transaction
      await t.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      t.rollback();
      throw new Error(`Couldn't delete diploma ${id}. ${error}`);
    }
  }
}
