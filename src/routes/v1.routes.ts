import { Router } from "express";

/** User Routes **/
import userRouter from "./v1/user.routes";
import postsRouter from "./v1/post.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postsRouter);
export default router;
