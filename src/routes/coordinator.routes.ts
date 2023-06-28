import { Router } from "express";
import v1Router from "./v1.routes";
const coordinatorRouter = Router();
coordinatorRouter.use("/v1", v1Router);
export default coordinatorRouter;
