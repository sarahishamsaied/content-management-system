"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_handler_1 = require("../../handlers/posts/posts.handler");
const verifyAccessToken_1 = __importDefault(require("../../middlewares/auth/verifyAccessToken"));
const checkOwnership_1 = __importDefault(require("../../repository/posts/checkOwnership"));
const postsRouter = (0, express_1.Router)();
postsRouter.post("/", verifyAccessToken_1.default, posts_handler_1.create);
postsRouter.get("/", posts_handler_1.index);
postsRouter.delete("/:id", verifyAccessToken_1.default, checkOwnership_1.default, posts_handler_1.deletePost);
postsRouter.put("/:id", verifyAccessToken_1.default, checkOwnership_1.default, posts_handler_1.update);
exports.default = postsRouter;
