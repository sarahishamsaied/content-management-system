import sequelizeConnection from "../../../config/sequelize.config";
import University from "../../../models/university";
import EducationInstitution from "../../../models/education_institution";
import { UniversityAttributes } from "../../types/educationalInstitutions";

export default class UniversityStore {
  /**
   * Retrieves a list of all universities with their associated education institutions.
   *
   * @returns {Promise<University[]>} A promise that resolves to an array of universities.
   * @throws {Error} If an error occurs while retrieving the universities.
   */
  async index(): Promise<University[]> {
    try {
      // Fetch all universities and include the associated education institutions
      const universities = (await University.findAll({
        include: [
          {
            model: EducationInstitution,
            as: "education_institution",
          },
        ],
      })) as University[];
      return universities;
    } catch (error) {
      throw new Error(
        `An error occurred while retrieving the universities. ${error}`
      );
    }
  }

  /**
   * Creates a new university with the associated education institution.
   *
   * @param {UniversityAttributes} university - The university attributes.
   * @returns {Promise<UniversityAttributes>} A promise that resolves to the created university attributes.
   * @throws {Error} If an error occurs while creating the university.
   */
  async create(
    university: UniversityAttributes
  ): Promise<UniversityAttributes> {
    try {
      // Create a new education institution
      const educationInstitution = await EducationInstitution.create(
        university
      );

      // Get the ID of the created education institution
      const id = educationInstitution.get("id") as number;

      // Create a new university with the education_institution_id
      const newUniversity = await University.create({
        education_institution_id: id,
      });

      // Combine the attributes of the new university and education institution
      const newUniversityFullAttributes: UniversityAttributes = {
        ...newUniversity.get(),
        ...educationInstitution.get(),
        id,
      };

      console.log("newUniversityFullAttributes: ", newUniversityFullAttributes);
      return newUniversityFullAttributes;
    } catch (error) {
      throw new Error(
        `An error occurred while creating the university. ${error}`
      );
    }
  }

  /**
   * Retrieves a specific university by its ID with the associated education institution.
   *
   * @param {number} id - The ID of the university to retrieve.
   * @returns {Promise<UniversityAttributes>} A promise that resolves to the university attributes.
   * @throws {Error} If the university is not found or an error occurs while retrieving it.
   */
  async show(id: number): Promise<UniversityAttributes> {
    try {
      // Find the university by its ID and include the associated education institution
      const university = await University.findByPk(id, {
        include: [
          {
            model: EducationInstitution,
            as: "education_institution",
          },
        ],
      });

      // Throw an error if the university is not found
      if (!university) {
        throw new Error(`Couldn't find university ${id}`);
      }

      // Get the plain object representation of the university attributes
      const universityData = university.get({
        plain: true,
      }) as UniversityAttributes;

      return universityData;
    } catch (error) {
      throw new Error(`Couldn't find university ${id}. ${error}`);
    }
  }

  /**
   * Updates a specific university and its associated education institution.
   *
   * @param {number} id - The ID of the university to update.
   * @param {Partial<UniversityAttributes>} universityData - The updated university attributes.
   * @returns {Promise<UniversityAttributes>} A promise that resolves to the updated university attributes.
   * @throws {Error} If the university or its associated education institution is not found,
   *                or an error occurs while updating them.
   */
  async update(
    id: number,
    universityData: Partial<UniversityAttributes>
  ): Promise<UniversityAttributes> {
    const t = await sequelizeConnection.transaction();
    try {
      // Find the university by its ID within a transaction
      const university = await University.findByPk(id, { transaction: t });

      // Throw an error if the university is not found
      if (!university) {
        throw new Error(`Couldn't find university ${id}`);
      }

      // Find the associated education institution within the same transaction
      const educationInstitution = await EducationInstitution.findByPk(
        university.education_institution_id,
        { transaction: t }
      );

      // Throw an error if the education institution is not found
      if (!educationInstitution) {
        throw new Error(
          `Couldn't find education institution ${university.education_institution_id}`
        );
      }

      // Update the university and education institution with the provided data within the transaction
      await university.update(universityData, { transaction: t });
      await educationInstitution.update(universityData, { transaction: t });

      // Commit the transaction
      await t.commit();

      // Combine the updated university and education institution attributes
      const universityFullAttributes = {
        ...university.get(),
        ...educationInstitution.get(),
        id: university.education_institution_id,
      };

      return universityFullAttributes;
    } catch (error) {
      // Rollback the transaction in case of an error
      await t.rollback();
      throw new Error(`Couldn't update university ${id}. ${error}`);
    }
  }

  /**
   * Deletes a specific university and its associated education institution.
   *
   * @param {number} id - The ID of the university to delete.
   * @returns {Promise<void>} A promise that resolves when the university is deleted successfully.
   * @throws {Error} If the university or its associated education institution is not found,
   *                or an error occurs while deleting them.
   */
  async delete(id: number): Promise<void> {
    const t = await sequelizeConnection.transaction();
    try {
      // Find the university by its ID within a transaction
      const university = await University.findByPk(id, { transaction: t });

      // Throw an error if the university is not found
      if (!university) {
        throw new Error(`Couldn't find university ${id}`);
      }

      // Find the associated education institution within the same transaction
      const educationInstitution = await EducationInstitution.findByPk(
        university.education_institution_id,
        { transaction: t }
      );

      // Throw an error if the education institution is not found
      if (!educationInstitution) {
        throw new Error(
          `Couldn't find education institution ${university.education_institution_id}`
        );
      }

      // Delete the university and education institution within the transaction
      await university.destroy({ transaction: t });
      await educationInstitution.destroy({ transaction: t });

      // Commit the transaction
      await t.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      t.rollback();
      throw new Error(`Couldn't delete university ${id}. ${error}`);
    }
  }
}
