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
exports.remove = exports.create = exports.show = exports.index = void 0;
const likes_store_1 = __importDefault(require("../../repository/likes/likes.store"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeStore = new likes_store_1.default();
        const likes = yield likeStore.index();
        res.status(200).json({
            likes,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error.",
        });
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const likeStore = new likes_store_1.default();
        const like = yield likeStore.show(parseInt(id));
        res.status(200).json({
            like,
        });
    }
    catch (error) {
        res.status(400).json({
            error,
        });
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, post_id } = req.body;
        const like = {
            user_id,
            post_id,
        };
        const likeStore = new likes_store_1.default();
        const newLike = yield likeStore.create(like);
        res.status(200).json({
            like: newLike,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
});
exports.create = create;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeStore = new likes_store_1.default();
    }
    catch (error) { }
});
exports.remove = remove;
