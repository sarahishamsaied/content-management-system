import { Router } from "express";
import {
  create,
  deactivate,
  index,
  login,
  show,
  verifyEmail,
} from "../../handlers/users/users.handler";
const userRouter = Router();
userRouter.get("/", index);
userRouter.post("/signup", create);
userRouter.get("/:id", show);
userRouter.delete("/:id", deactivate);
userRouter.post("/login", login);
userRouter.get("/verify/:token", verifyEmail);
export default userRouter;
