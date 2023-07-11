import { Request, Response } from "express";
import LikeStore from "../../repository/likes/likes.store";
import Like from "../../../models/like";
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const likeStore = new LikeStore();
    const likes = await likeStore.index();
    res.status(200).json({
      likes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const likeStore = new LikeStore();
    const like = await likeStore.show(parseInt(id));
    res.status(200).json({
      like,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, post_id } = req.body;
    const like = {
      user_id,
      post_id,
    } as Like;
    const likeStore = new LikeStore();
    const newLike = await likeStore.create(like);
    res.status(200).json({
      like: newLike,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const remove = async (id: number) => {
  try {
    const likeStore = new LikeStore();
  } catch (error) {}
};

export { index, show, create, remove };
