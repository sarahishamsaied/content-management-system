import sequelizeConnection from "../../../config/sequelize.config";
import EducationInstitution from "../../../models/education_institution";
import School from "../../../models/school";
import { SchoolAttributes } from "../../types/educationalInstitutions";

export default class SchoolStore {
  /**
   * Retrieves a list of all schools.
   *
   * @returns {Promise<School[]>} A promise that resolves to an array of schools.
   * @throws {Error} If an error occurs while retrieving the schools.
   */
  async index(): Promise<School[]> {
    try {
      // Fetch all schools
      const schools = (await School.findAll({})) as School[];
      console.log("schools are: ", schools);
      return schools;
    } catch (error) {
      throw new Error(`Could not find schools. ${error}`);
    }
  }

  /**
   * Retrieves a specific school by its ID with the associated education institution.
   *
   * @param {number} id - The ID of the school to retrieve.
   * @returns {Promise<School>} A promise that resolves to the school object.
   * @throws {Error} If the school is not found or an error occurs while retrieving it.
   */
  async show(id: number): Promise<School> {
    try {
      // Find the school by its ID and include the associated education institution
      const school = (await School.findByPk(id, {
        include: [
          {
            model: EducationInstitution,
            as: "education_institution",
          },
        ],
      })) as School;

      // Throw an error if the school is not found
      if (!school) {
        throw new Error(`Could not find school ${id}`);
      }

      return school;
    } catch (error) {
      throw new Error(`Could not find school ${id}.`);
    }
  }

  /**
   * Creates a new school with the associated education institution.
   *
   * @param {SchoolAttributes} school - The school attributes.
   * @returns {Promise<SchoolAttributes>} A promise that resolves to the created school attributes.
   * @throws {Error} If an error occurs while creating the school.
   */
  async create(school: SchoolAttributes): Promise<SchoolAttributes> {
    const t = await sequelizeConnection.transaction();
    try {
      // Create a new education institution
      const educationInstitution = (await EducationInstitution.create(
        school
      )) as EducationInstitution;

      // Create a new school with the associated education institution ID
      let newSchool = await School.create(
        {
          ...school,
          education_institution_id: educationInstitution.get("id") as number,
        },
        {
          include: [
            {
              model: EducationInstitution,
              as: "education_institution",
            },
          ],
        }
      );

      // Combine the attributes of the new school and education institution
      const newSchoolAttributes: SchoolAttributes = {
        ...newSchool.get(),
        ...educationInstitution.get(),
        id: educationInstitution.get("id") as number,
      };

      t.commit();
      return newSchoolAttributes;
    } catch (error) {
      console.log("error is: ", error);
      t.rollback();
      throw new Error(`Could not create new school. ${error}`);
    }
  }

  /**
   * Updates a specific school.
   *
   * @param {number} id - The ID of the school to update.
   * @param {SchoolAttributes} school - The updated school attributes.
   * @returns {Promise<SchoolAttributes>} A promise that resolves to the updated school attributes.
   * @throws {Error} If the school is not found or an error occurs while updating it.
   */
  async update(
    id: number,
    school: SchoolAttributes
  ): Promise<SchoolAttributes> {
    const t = await sequelizeConnection.transaction();
    try {
      // Find the school by its ID
      const schoolToUpdate = (await School.findByPk(id)) as School;

      // Throw an error if the school is not found
      if (!schoolToUpdate) {
        throw new Error(`Could not find school ${id}.`);
      }

      // Update the school with the provided attributes
      const updatedSchool = await schoolToUpdate.update(school);

      // Get the updated school attributes
      const updatedSchoolAttributes = updatedSchool.get() as SchoolAttributes;

      t.commit();
      return updatedSchoolAttributes;
    } catch (error) {
      t.rollback();
      throw new Error(`Could not update school ${id}. ${error}`);
    }
  }

  /**
   * Deletes a specific school.
   *
   * @param {number} id - The ID of the school to delete.
   * @returns {Promise<SchoolAttributes>} A promise that resolves to the deleted school attributes.
   * @throws {Error} If the school is not found or an error occurs while deleting it.
   */
  async delete(id: number): Promise<SchoolAttributes> {
    const t = await sequelizeConnection.transaction();
    try {
      // Find the school by its ID
      const schoolToDelete = (await School.findByPk(id)) as School;
      const educationInstitution = (await EducationInstitution.findByPk(
        id
      )) as EducationInstitution;

      // Delete the education institution

      await educationInstitution.destroy();

      // Throw an error if the school is not found
      if (!schoolToDelete) {
        throw new Error(`Could not find school ${id}.`);
      }

      // Get the attributes of the school to delete
      const schoolToDeleteAttributes = schoolToDelete.get() as SchoolAttributes;

      // Delete the school
      await schoolToDelete.destroy();

      t.commit();
      return schoolToDeleteAttributes;
    } catch (error) {
      t.rollback();
      throw new Error(`Could not delete school ${id}. ${error}`);
    }
  }
}
