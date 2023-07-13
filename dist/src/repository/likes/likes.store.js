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
const like_1 = __importDefault(require("../../../models/like"));
const post_1 = __importDefault(require("../../../models/post"));
const user_1 = __importDefault(require("../../../models/user"));
class LikeStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield like_1.default.findAll({});
                return likes;
            }
            catch (error) {
                throw new Error("Error finding likes");
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield like_1.default.findByPk(id);
                if (!like)
                    throw new Error("Cannot find like");
                return like;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    create(like) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPost = yield post_1.default.findByPk(like.post_id);
                if (!foundPost)
                    throw new Error("Cannot find post");
                const foundUser = yield user_1.default.findByPk(like.user_id);
                if (!foundUser)
                    throw new Error("Cannot find user");
                const createdLike = yield like_1.default.create(like);
                return createdLike;
            }
            catch (error) {
                throw new Error(`Error liking post, Error: ${error}`);
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundLike = yield like_1.default.findByPk(id);
                if (!foundLike)
                    throw new Error(`Cannot find like`);
            }
            catch (error) {
                throw new Error(`Cannot remove like, Error: ${error}`);
            }
        });
    }
}
exports.default = LikeStore;
