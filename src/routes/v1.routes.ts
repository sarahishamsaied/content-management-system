import { Router } from "express";

/** User Routes **/
import userRouter from "./v1/user.routes";
import postsRouter from "./v1/post.routes";
import universityRouter from "./v1/university.routes";
import schoolRouter from "./v1/school.routes";
import diplomaRouter from "./v1/diploma.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postsRouter);
router.use("/uni", universityRouter);
router.use("/school", schoolRouter);
router.use("/diploma", diplomaRouter);
export default router;
