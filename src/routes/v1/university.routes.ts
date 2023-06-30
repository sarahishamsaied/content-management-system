import { Router } from "express";
import {
  create,
  index,
  show,
  update,
} from "../../handlers/educational institutions/university.handler";
const universityRouter = Router();
universityRouter.get("/", index);
universityRouter.post("/", create);
universityRouter.get("/:id", show);
universityRouter.put("/:id", update);

export default universityRouter;
