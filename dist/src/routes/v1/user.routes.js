"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_store_1 = __importDefault(require("../../repository/users/user.store"));
const userRouter = (0, express_1.Router)();
const userStore = new user_store_1.default();
userRouter.get("/", userStore.index);
userRouter.get("/:id", userStore.show);
userRouter.post("/", userStore.create);
exports.default = userRouter;
