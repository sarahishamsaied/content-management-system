import { Request, Response, NextFunction } from "express";
import SchoolStore from "../../repository/Educational Institution/school.store";
import { validateEducationalInstitution } from "../../validation";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schoolStore = new SchoolStore();
    const schools = await schoolStore.index();
    res.status(200).json({ schools });
  } catch (error) {
    res.status(401).json({ message: error as Error });
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, address, phone, email, country, city } =
      req.body;
    const { error, value } = await validateEducationalInstitution({
      name,
      description,
      address,
      phone,
      email,
      country,
      city,
    });
    if (error) return res.status(401).json({ message: error.message });
    const schoolStore = new SchoolStore();
    const school = await schoolStore.create(req.body);
    res.status(200).json(school);
  } catch (error) {
    res.status(401).json({ message: error as Error });
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schoolStore = new SchoolStore();
    const school = await schoolStore.show(Number(req.params.id));
    res.status(200).json(school);
  } catch (error) {
    res.status(401).json({ message: error as Error });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schoolStore = new SchoolStore();
    const school = await schoolStore.update(Number(req.params.id), req.body);
    res.status(200).json(school);
  } catch (error) {
    res.status(401).json({ message: error as Error });
  }
};

const deleteSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schoolStore = new SchoolStore();
    const school = await schoolStore.delete(Number(req.params.id));
    res.status(200).json(school);
  } catch (error) {
    res.status(401).json({ message: error as Error });
  }
};

export { index, create, show, update, deleteSchool };
