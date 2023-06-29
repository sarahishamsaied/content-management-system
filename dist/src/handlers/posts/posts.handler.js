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
exports.deletePost = exports.update = exports.create = exports.show = exports.index = void 0;
const post_store_1 = __importDefault(require("../../repository/posts/post.store"));
const validation_1 = require("../../validation");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postSore = new post_store_1.default();
        const posts = yield postSore.index();
        res.json(posts);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            throw new Error("id is required");
        const postStore = new post_store_1.default();
        const post = yield postStore.show(parseInt(id));
        res.json(post);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, image_url } = req.body;
        const { id: author_id } = req.user;
        console.log(req.user);
        console.log("author_id", author_id);
        const { error } = (0, validation_1.validatePost)({ author_id, body });
        if (error)
            throw new Error(error.details[0].message);
        const postStore = new post_store_1.default();
        const inputPost = { title, body, image_url, author_id };
        const post = yield postStore.create(inputPost);
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id: author_id } = req.user;
        const { body } = req.body;
        const { error } = (0, validation_1.validatePost)({ author_id, body });
        if (error)
            throw new Error(error.details[0].message);
        const postStore = new post_store_1.default();
        const post = yield postStore.update(parseInt(id), req.body);
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.update = update;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const postStore = new post_store_1.default();
        const deleted = yield postStore.delete(parseInt(id));
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.deletePost = deletePost;
