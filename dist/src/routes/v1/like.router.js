"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_handler_1 = require("../../handlers/likes/likes.handler");
const checkOwnership_1 = __importDefault(require("../../middlewares/checkOwnership"));
const ResourceOwnership_1 = require("../../types/ResourceOwnership");
const verifyAccessToken_1 = __importDefault(require("../../middlewares/auth/verifyAccessToken"));
const likeRouter = (0, express_1.Router)();
likeRouter.get("/", likes_handler_1.index);
likeRouter.get("/:id", verifyAccessToken_1.default, likes_handler_1.show);
likeRouter.post("/", verifyAccessToken_1.default, likes_handler_1.create);
likeRouter.delete("/:id", verifyAccessToken_1.default, (0, checkOwnership_1.default)(ResourceOwnership_1.ResourceType.Like), likes_handler_1.remove);
exports.default = likeRouter;
