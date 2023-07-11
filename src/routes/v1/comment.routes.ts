import { Router } from "express";
import {
  index,
  show,
  create,
  update,
  deleteComment,
} from "../../handlers/comments/comment.handler";
import verifyAccessToken from "../../middlewares/auth/verifyAccessToken";
import verifyOwnership from "../../middlewares/checkOwnership";
import { ResourceOwnershipType } from "../../types/ResourceOwnership";
const commentRouter = Router();
commentRouter.get("/", index);
commentRouter.get("/:id", show);
commentRouter.post("/", verifyAccessToken, create);
commentRouter.put(
  "/:id",
  verifyAccessToken,
  verifyOwnership(ResourceOwnershipType.Comment),
  update
);
commentRouter.delete(
  "/:id",
  verifyAccessToken,
  verifyOwnership(ResourceOwnershipType.Comment),
  deleteComment
);

export default commentRouter;
