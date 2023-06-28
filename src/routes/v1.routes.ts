import { Router } from "express";

/** User Routes **/
import userRouter from "./v1/user.routes";

const router = Router();

router.use("/users", userRouter);

export default router;
