import { Router } from "express";
import {
  create,
  deletePost,
  index,
  show,
  update,
} from "../../handlers/posts/posts.handler";
import verifyAccessToken from "../../middlewares/auth/verifyAccessToken";
import verifyOwnership from "../../middlewares/checkOwnership";
import { ResourceType } from "../../types/ResourceOwnership";

const postsRouter = Router();

postsRouter.post("/", verifyAccessToken, create);
postsRouter.get("/:id", show);
postsRouter.get("/", index);
postsRouter.delete(
  "/:id",
  verifyAccessToken,
  verifyOwnership(ResourceType.Post),
  deletePost
);
postsRouter.put(
  "/:id",
  verifyAccessToken,
  verifyOwnership(ResourceType.Post),
  update
);

export default postsRouter;
