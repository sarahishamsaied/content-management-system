import { Request, Response, NextFunction } from "express";
import UniversityStore from "../../repository/Educational Institution/university.store";
const index = (req: Request, res: Response, next: NextFunction) => {
  try {
    const universityStore = new UniversityStore();
    const universities = universityStore.index();
    res.status(200).json({ universities });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
export { index };
