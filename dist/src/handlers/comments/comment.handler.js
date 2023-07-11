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
exports.deleteComment = exports.update = exports.show = exports.create = exports.index = void 0;
const comment_store_1 = __importDefault(require("../../repository/comments/comment.store"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentStore = new comment_store_1.default();
        const comments = yield commentStore.index();
        res.status(200).json({
            comments,
        });
    }
    catch (error) {
        res.status(400).json({
            error,
        });
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_body: body, author_id, post_id } = req.body;
        const comment = { body, author_id, post_id };
        const commentStore = new comment_store_1.default();
        const addedComment = yield commentStore.create(comment);
        res.status(200).json({
            comment: addedComment,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
});
exports.create = create;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const commentStore = new comment_store_1.default();
        const comment = yield commentStore.show(Number(id));
        res.status(200).json({
            comment,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //comment:Comment,id:number
        const { body, id } = req.body;
        const commentStore = new comment_store_1.default();
        const updatedComment = yield commentStore.update(body, id);
        res.status(200).json({
            comment: updatedComment,
            message: "Success",
        });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
});
exports.update = update;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const commentStore = new comment_store_1.default();
        const deleted = yield commentStore.deleteComment(id);
        res.status(200).json({
            message: "Comment Deleted Successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
});
exports.deleteComment = deleteComment;
