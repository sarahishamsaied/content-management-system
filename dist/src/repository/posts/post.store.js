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
const post_1 = __importDefault(require("../../../models/post"));
const user_1 = __importDefault(require("../../../models/user"));
const comment_1 = __importDefault(require("../../../models/comment"));
class PostStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_1.default.findAll({});
                console.log("posts are: ", posts);
                return posts;
            }
            catch (error) {
                console.log(error);
                throw new Error(`An Error Occurred. ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield post_1.default.findByPk(id, {
                    include: {
                        model: comment_1.default,
                        as: "comments",
                    },
                });
                return post;
            }
            catch (error) {
                throw new Error(`Couldn't find post. ${error}`);
            }
        });
    }
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author_id } = post;
                const foundAuthor = yield user_1.default.findByPk(author_id);
                if (!foundAuthor)
                    throw new Error(`Couldn't find author ${author_id}`);
                const newPost = yield post_1.default.create(post);
                return newPost;
            }
            catch (error) {
                throw new Error(`Couldn't create post. ${error}`);
            }
        });
    }
    update(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPost = yield post_1.default.findByPk(id);
                if (!foundPost)
                    throw new Error(`Couldn't find post ${id}`);
                const updatedPost = yield foundPost.update(post);
                return updatedPost;
            }
            catch (error) {
                throw new Error(`Couldn't update post ${id}. ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPost = yield post_1.default.findByPk(id);
                if (!foundPost)
                    throw new Error(`Couldn't find post ${id}`);
                yield foundPost.destroy();
                return true;
            }
            catch (error) {
                throw new Error(`Couldn't delete post ${id}. ${error}`);
            }
        });
    }
    authorPosts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield user_1.default.findByPk(id);
                if (!author)
                    throw new Error("Cannot find user");
                const posts = yield post_1.default.findAll({
                    where: {
                        author_id: id,
                    },
                });
                return posts;
            }
            catch (error) {
                throw new Error(`An error occurred, Error: ${error}`);
            }
        });
    }
    showPostComments(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundPost = yield post_1.default.findByPk(id);
                if (!foundPost)
                    throw new Error("Cannot find post");
                const comments = yield comment_1.default.findAll({
                    where: {
                        post_id: id,
                    },
                });
                return comments;
            }
            catch (error) {
                throw new Error(`An error occurred, Error: ${error}`);
            }
        });
    }
}
exports.default = PostStore;
