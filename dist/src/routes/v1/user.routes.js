"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_handler_1 = require("../../handlers/users/users.handler");
const userRouter = (0, express_1.Router)();
userRouter.get("/", users_handler_1.index);
userRouter.post("/", users_handler_1.create);
exports.default = userRouter;
