import { Request, Response, NextFunction } from "express";
import CommentStore from "../../repository/comments/comment.store";
import Comment from "../../../models/comment";

interface CustomRequest extends Request {
  id?: number;
  post_id?: number;
  author_id?: number;
  comment_body?: string;
}

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentStore = new CommentStore();
    const comments = await commentStore.index();
    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
const create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { comment_body: body, author_id, post_id } = req.body;
    const comment = { body, author_id, post_id };
    const commentStore = new CommentStore();
    const addedComment = await commentStore.create(comment as Comment);
    res.status(200).json({
      comment: addedComment,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const commentStore = new CommentStore();
    const comment = await commentStore.show(Number(id));
    res.status(200).json({
      comment,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const update = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    //comment:Comment,id:number
    const { body, id } = req;
    const commentStore = new CommentStore();
    const updatedComment = await commentStore.update(body, id as number);
    res.status(200).json({
      comment: updatedComment,
      message: "Success",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const deleteComment = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req;
    const commentStore = new CommentStore();
    const deleted = await commentStore.deleteComment(id as number);
    res.status(200).json({
      message: "Comment Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export { index, create, show, update, deleteComment };
