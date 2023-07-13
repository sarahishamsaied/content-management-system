"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_handler_1 = require("../../handlers/comments/comment.handler");
const verifyAccessToken_1 = __importDefault(require("../../middlewares/auth/verifyAccessToken"));
const checkOwnership_1 = __importDefault(require("../../middlewares/checkOwnership"));
const ResourceOwnership_1 = require("../../types/ResourceOwnership");
const commentRouter = (0, express_1.Router)();
commentRouter.get("/", comment_handler_1.index);
commentRouter.get("/:id", comment_handler_1.show);
commentRouter.post("/", verifyAccessToken_1.default, comment_handler_1.create);
commentRouter.put("/:id", verifyAccessToken_1.default, (0, checkOwnership_1.default)(ResourceOwnership_1.ResourceType.Comment), comment_handler_1.update);
commentRouter.delete("/:id", verifyAccessToken_1.default, (0, checkOwnership_1.default)(ResourceOwnership_1.ResourceType.Comment), comment_handler_1.deleteComment);
exports.default = commentRouter;
