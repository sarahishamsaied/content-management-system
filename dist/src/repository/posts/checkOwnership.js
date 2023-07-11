"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_store_1 = __importDefault(require("../../repository/posts/post.store"));
const checkOwnership = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = req.body;
        console.log("user", user);
        const postStore = new post_store_1.default();
        const post = yield postStore.show(parseInt(id));
        if (!post)
            return res.status(404).json({ message: "Post not found" });
        if (post.author_id !== user.id)
            return res.status(401).json({ message: "Unauthorized" });
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.default = checkOwnership;
