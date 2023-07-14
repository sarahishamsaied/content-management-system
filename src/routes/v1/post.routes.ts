import { Router } from "express";
import {
  create,
  deletePost,
  index,
  show,
  update,
} from "../../handlers/posts/posts.handler";
import {
  verifyAccessToken,
  verifyGoogleAccessToken,
} from "../../middlewares/auth/verifyAccessToken";
import verifyOwnership from "../../middlewares/checkOwnership";
import { ResourceType } from "../../types/ResourceOwnership";

const postsRouter = Router();

postsRouter.post("/", verifyAccessToken, verifyGoogleAccessToken, create);
postsRouter.get("/:id", verifyAccessToken, verifyGoogleAccessToken, show);
postsRouter.get("/", verifyAccessToken, verifyGoogleAccessToken, index);
postsRouter.delete(
  "/:id",
  verifyAccessToken,
  verifyGoogleAccessToken,
  verifyOwnership(ResourceType.Post),
  deletePost
);
postsRouter.put(
  "/:id",
  verifyAccessToken,
  verifyGoogleAccessToken,
  verifyOwnership(ResourceType.Post),
  update
);

export default postsRouter;
