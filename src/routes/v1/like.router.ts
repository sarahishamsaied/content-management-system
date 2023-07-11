import { Router } from "express";
import {
  create,
  index,
  remove,
  show,
} from "../../handlers/likes/likes.handler";

const likeRouter = Router();

likeRouter.get("/", index);
likeRouter.get("/:id", show);
likeRouter.post("/", create);
likeRouter.delete("/:id", remove);

export default likeRouter;
