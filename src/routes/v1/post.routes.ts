import { Router } from "express";
import {
  create,
  deletePost,
  index,
  update,
} from "../../handlers/posts/posts.handler";
import verifyAccessToken from "../../middlewares/auth/verifyAccessToken";
import checkOwnership from "../../repository/posts/checkOwnership";
const postsRouter = Router();

postsRouter.post("/", verifyAccessToken, create);
postsRouter.get("/", index);
postsRouter.delete("/:id", verifyAccessToken, checkOwnership, deletePost);
postsRouter.put("/:id", verifyAccessToken, checkOwnership, update);

export default postsRouter;
