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
const post_store_1 = __importDefault(require("../repository/posts/post.store"));
const likes_store_1 = __importDefault(require("../repository/likes/likes.store"));
const comment_store_1 = __importDefault(require("../repository/comments/comment.store"));
/**
 * Verifies ownership for a Post.
 *
 * @param {UserAttributesWithId} user - The user attributes with ID.
 * @param {number} id - The ID of the post.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating ownership verification.
 */
const verifyPostOwnership = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const postStore = new post_store_1.default();
    const post = yield postStore.show(id);
    return !!post && post.author_id === user.id;
});
/**
 * Verifies ownership for a Like.
 *
 * @param {UserAttributesWithId} user - The user attributes with ID.
 * @param {number} id - The ID of the like.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating ownership verification.
 */
const verifyLikeOwnership = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const likeStore = new likes_store_1.default();
    const like = yield likeStore.show(id);
    return !!like && like.user_id === user.id;
});
/**
 * Verifies ownership for a Comment.
 *
 * @param {UserAttributesWithId} user - The user attributes with ID.
 * @param {number} id - The ID of the comment.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating ownership verification.
 */
const verifyCommentOwnership = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const commentStore = new comment_store_1.default();
    const comment = yield commentStore.show(id);
    return !!comment && comment.author_id === user.id;
});
/**
 * Middleware to verify ownership of a resource.
 *
 * @param {keyof typeof ResourceType} resource - The type of resource to verify ownership for.
 * @returns {Function} The middleware function.
 * @throws {Error} If an invalid resource type is provided.
 */
const verifyOwnership = (resource) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user } = req;
    console.log("user", user);
    let isVerified = false;
    switch (resource) {
        case "Post":
            isVerified = yield verifyPostOwnership(user, parseInt(id));
            break;
        case "Like":
            isVerified = yield verifyLikeOwnership(user, parseInt(id));
            break;
        case "Comment":
            isVerified = yield verifyCommentOwnership(user, parseInt(id));
            break;
        default:
            throw new Error("Invalid resource type");
    }
    if (!isVerified) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
});
exports.default = verifyOwnership;
