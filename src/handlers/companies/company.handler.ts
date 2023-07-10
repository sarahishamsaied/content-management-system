import { Request, Response, NextFunction } from "express";
import CompanyStore from "../../repository/companies/company.store";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyStore = new CompanyStore();
    const companies = await companyStore.index();
    res.status(200).json({ companies });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: (error as Error).message });
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyStore = new CompanyStore();
    const company = await companyStore.create(req.body);
    console.log("company: ", company);
    res.status(200).json(company);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyStore = new CompanyStore();
    const company = await companyStore.show(Number(req.params.id));
    res.status(200).json(company);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyStore = new CompanyStore();
    const company = await companyStore.update(Number(req.params.id), req.body);
    res.status(200).json(company);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

const deleteCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyStore = new CompanyStore();
    const company = await companyStore.deleteCompany(Number(req.params.id));
    res.status(200).json(company);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export { index, create, show, update, deleteCompany };
