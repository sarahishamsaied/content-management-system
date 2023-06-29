import { Request, Response, NextFunction } from "express";
import CustomRequest from "../types/CustomRequest";
const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    if (!(user as any).is_admin)
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
export default isAdmin;
