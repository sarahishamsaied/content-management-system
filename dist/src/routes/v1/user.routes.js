"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_handler_1 = require("../../handlers/users/users.handler");
const userRouter = (0, express_1.Router)();
userRouter.get("/", users_handler_1.index);
userRouter.post("/signup", users_handler_1.create);
userRouter.get("/:id", users_handler_1.show);
userRouter.delete("/:id", users_handler_1.deactivate);
userRouter.post("/login", users_handler_1.login);
exports.default = userRouter;
