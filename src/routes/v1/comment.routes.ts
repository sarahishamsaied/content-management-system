import { Router } from "express";
import {
  index,
  show,
  create,
  update,
  deleteComment,
} from "../../handlers/comments/comment.handler";
const commentRouter = Router();
commentRouter.get("/", index);
commentRouter.get("/:id", show);
commentRouter.post("/", create);
commentRouter.put("/:id", update);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
