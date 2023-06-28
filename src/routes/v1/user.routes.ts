import { Router } from "express";
import { create, index } from "../../handlers/users/users.handler";
const userRouter = Router();
userRouter.get("/", index);
userRouter.post("/", create);
export default userRouter;
