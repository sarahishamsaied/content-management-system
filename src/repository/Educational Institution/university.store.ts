import University from "../../../models//university";
export default class UniversityStore {
  async index() {
    try {
      const universities = await University.findAll({});
      return universities;
    } catch (error) {
      throw new Error(`An Error Occurred. ${error}`);
    }
  }
}
