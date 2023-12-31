import { Router } from "express";
import {
  index,
  create,
  show,
  update,
  deleteDiploma,
} from "../../handlers/educational institutions/diploma.handler";

const diplomaRouter = Router();

diplomaRouter.get("/", index);
diplomaRouter.post("/", create);
diplomaRouter.get("/:id", show);
diplomaRouter.put("/:id", update);
diplomaRouter.delete("/:id", deleteDiploma);

export default diplomaRouter;
