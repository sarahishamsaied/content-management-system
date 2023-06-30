import { Router } from "express";

/** User Routes **/
import userRouter from "./v1/user.routes";
import postsRouter from "./v1/post.routes";
import universityRouter from "./university.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postsRouter);
router.use("/uni", universityRouter);
export default router;
