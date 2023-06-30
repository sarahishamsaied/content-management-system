import { Router } from "express";
import {
  index,
  create,
  show,
  update,
  deleteCompany,
} from "../../handlers/companies/company.handler";

const router = Router();

router.get("/", index);
router.post("/", create);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", deleteCompany);

export default router;
