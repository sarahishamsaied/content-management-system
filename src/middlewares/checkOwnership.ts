import { Request, Response, NextFunction } from "express";
import PostStore from "../repository/posts/post.store";
import CustomRequest from "../types/CustomRequest";
import User, { UserAttributes } from "../../models/user";
import { UserAttributesWithId } from "../types/userTypes";
import LikeStore from "../repository/likes/likes.store";
import CommentStore from "../repository/comments/comment.store";
import { ResourceOwnershipType } from "../types/ResourceOwnership";
/**
 * Verifies ownership for a Post.
 *
 * @param {UserAttributesWithId} user - The user attributes with ID.
 * @param {number} id - The ID of the post.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating ownership verification.
 */
const verifyPostOwnership = async (
  user: UserAttributesWithId,
  id: number
): Promise<boolean> => {
  const postStore = new PostStore();
  const post = await postStore.show(id);
  return !!post && post.author_id === user.id;
};

/**
 * Verifies ownership for a Like.
 *
 * @param {UserAttributesWithId} user - The user attributes with ID.
 * @param {number} id - The ID of the like.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating ownership verification.
 */
const verifyLikeOwnership = async (
  user: UserAttributesWithId,
  id: number
): Promise<boolean> => {
  const likeStore = new LikeStore();
  const like = await likeStore.show(id);
  return !!like && like.user_id === user.id;
};

/**
 * Verifies ownership for a Comment.
 *
 * @param {UserAttributesWithId} user - The user attributes with ID.
 * @param {number} id - The ID of the comment.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating ownership verification.
 */
const verifyCommentOwnership = async (
  user: UserAttributesWithId,
  id: number
): Promise<boolean> => {
  const commentStore = new CommentStore();
  const comment = await commentStore.show(id);
  return !!comment && comment.author_id === user.id;
};
/**
 * Middleware to verify ownership of a resource.
 *
 * @param {keyof typeof ResourceOwnershipType} resource - The type of resource to verify ownership for.
 * @returns {Function} The middleware function.
 * @throws {Error} If an invalid resource type is provided.
 */
const verifyOwnership =
  (resource: keyof typeof ResourceOwnershipType) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    console.log("user", user);
    let isVerified = false;
    switch (resource) {
      case "Post":
        isVerified = await verifyPostOwnership(
          user as UserAttributesWithId,
          parseInt(id)
        );
        break;
      case "Like":
        isVerified = await verifyLikeOwnership(
          user as UserAttributesWithId,
          parseInt(id)
        );
        break;
      case "Comment":
        isVerified = await verifyCommentOwnership(
          user as UserAttributesWithId,
          parseInt(id)
        );
        break;
      default:
        throw new Error("Invalid resource type");
    }

    if (!isVerified) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };

export default verifyOwnership;
