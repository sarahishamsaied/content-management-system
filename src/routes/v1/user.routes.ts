import { Router } from "express";
import UserStore from "../../repository/users/user.store";
const userRouter = Router();
const userStore = new UserStore();
userRouter.get("/", userStore.index);
userRouter.get("/:id", userStore.show);
userRouter.post("/", userStore.create);

export default userRouter;
