import { Router } from "express";
import {
  index,
  show,
  create,
  update,
  deleteComment,
} from "../../handlers/comments/comment.handler";
import { verifyAccessToken } from "../../middlewares/auth/verifyAccessToken";
import verifyOwnership from "../../middlewares/checkOwnership";
import { ResourceType } from "../../types/ResourceOwnership";
const commentRouter = Router();
commentRouter.get("/", index);
commentRouter.get("/:id", show);
commentRouter.post("/", verifyAccessToken, create);
commentRouter.put(
  "/:id",
  verifyAccessToken,
  verifyOwnership(ResourceType.Comment),
  update
);
commentRouter.delete(
  "/:id",
  verifyAccessToken,
  verifyOwnership(ResourceType.Comment),
  deleteComment
);

export default commentRouter;
