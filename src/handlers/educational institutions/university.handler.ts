import { Request, Response, NextFunction } from "express";
import UniversityStore from "../../repository/Educational Institution/university.store";
const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const universityStore = new UniversityStore();
    const universities = await universityStore.index();
    res.status(200).json({ universities });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const universityStore = new UniversityStore();
    const university = await universityStore.create(req.body);
    console.log("university: ", university);
    res.status(200).json(university);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const universityStore = new UniversityStore();
    const university = await universityStore.show(Number(req.params.id));
    res.status(200).json(university);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const universityStore = new UniversityStore();
    const university = await universityStore.update(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(university);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
export { index, create, show, update };
