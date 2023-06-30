import { Router } from "express";
import {
  create,
  index,
  show,
  update,
  deleteSchool,
} from "../../handlers/educational institutions/school.handler";

const schoolRouter = Router();

schoolRouter.get("/", index);
schoolRouter.post("/", create);
schoolRouter.get("/:id", show);
schoolRouter.put("/:id", update);
schoolRouter.delete("/:id", deleteSchool);

export default schoolRouter;
