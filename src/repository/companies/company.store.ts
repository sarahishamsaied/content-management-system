import Company from "../../../models/company";

export default class CompanyStore {
  async index() {
    try {
      const companies = await Company.findAll({});
      return companies;
    } catch (error) {
      throw new Error(`An Error Occurred. ${error}`);
    }
  }
  async create(company: Company): Promise<Company> {
    try {
      const { name, description, img_url, phone_number, address, bio } =
        company;
      const newCompany = await Company.create({
        name,
        description,
        img_url,
        phone_number,
        address,
        bio,
      });
      return newCompany;
    } catch (error) {
      throw new Error(`Couldn't create company. ${error}`);
    }
  }
  async show(id: number) {
    try {
      const company = await Company.findByPk(id);
      return company;
    } catch (error) {
      throw new Error(`Couldn't find company. ${error}`);
    }
  }
  async update(id: number, company: Company) {
    try {
      const foundCompany = await Company.findByPk(id);
      if (!foundCompany) throw new Error(`Couldn't find company ${id}`);
      const updatedCompany = await foundCompany.update(company);
      return updatedCompany;
    } catch (error) {
      throw new Error(`Couldn't update company ${id}. ${error}`);
    }
  }
  async deleteCompany(id: number) {
    try {
      const foundCompany = await Company.findByPk(id);
      if (!foundCompany) throw new Error(`Couldn't find company ${id}`);
      await foundCompany.destroy();
      return true;
    } catch (error) {
      throw new Error(`Couldn't delete company ${id}. ${error}`);
    }
  }
}
