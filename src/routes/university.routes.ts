import { Router } from "express";
import { index } from "../handlers/educational institutions/university.handler";
const universityRouter = Router();
universityRouter.get("/", index);

export default universityRouter;
