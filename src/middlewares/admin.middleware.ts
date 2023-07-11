import { Request, Response, NextFunction } from "express";
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    if (!user.is_admin)
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
export default isAdmin;
