import { Request, Response, NextFunction } from "express";
import DiplomaStore from "../../repository/Educational Institution/diploma.store";
const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diplomaStore = new DiplomaStore();
    const diplomas = await diplomaStore.index();
    res.status(200).json({ diplomas });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diplomaStore = new DiplomaStore();
    const diploma = await diplomaStore.create(req.body);
    console.log("diploma: ", diploma);
    res.status(200).json(diploma);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diplomaStore = new DiplomaStore();
    const diploma = await diplomaStore.show(Number(req.params.id));
    res.status(200).json(diploma);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diplomaStore = new DiplomaStore();
    const diploma = await diplomaStore.update(Number(req.params.id), req.body);
    res.status(200).json(diploma);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
export { index, create, show, update };
