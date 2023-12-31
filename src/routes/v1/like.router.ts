import { Router } from "express";
import {
  create,
  index,
  remove,
  show,
} from "../../handlers/likes/likes.handler";
import verifyOwnership from "../../middlewares/checkOwnership";
import { ResourceOwnershipType } from "../../types/ResourceOwnership";
import verifyAccessToken from "../../middlewares/auth/verifyAccessToken";
const likeRouter = Router();

likeRouter.get("/", index);
likeRouter.get("/:id", verifyAccessToken, show);
likeRouter.post("/", verifyAccessToken, create);
likeRouter.delete(
  "/:id",
  verifyAccessToken,
  verifyOwnership(ResourceOwnershipType.Like),
  remove
);

export default likeRouter;
