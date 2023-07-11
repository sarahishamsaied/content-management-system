import { Request, Response, NextFunction } from "express";
import PostStore from "../repository/posts/post.store";
import CustomRequest from "../types/CustomRequest";
import User, { UserAttributes } from "../../models/user";
import { UserAttributesWithId } from "../types/userTypes";
import LikeStore from "../repository/likes/likes.store";
import CommentStore from "../repository/comments/comment.store";
import { ResourceOwnershipType } from "../types/ResourceOwnership";

const verifyPostOwnership = async (user: UserAttributesWithId, id: number) => {
  const postStore = new PostStore();
  const post = await postStore.show(id);
  return !!post && post.author_id === user.id;
};

const verifyLikeOwnership = async (user: UserAttributesWithId, id: number) => {
  const likeStore = new LikeStore();
  const like = await likeStore.show(id);
  return !!like && like.user_id === user.id;
};

const verifyCommentOwnership = async (
  user: UserAttributesWithId,
  id: number
) => {
  const commentStore = new CommentStore();
  const comment = await commentStore.show(id);
  return !!comment && comment.author_id === user.id;
};

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
