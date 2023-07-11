import PostStore from "../../repository/posts/post.store";
import { Request, Response } from "express";
import { validatePost } from "../../validation";

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const postSore = new PostStore();
    const posts = await postSore.index();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("id is required");
    const postStore = new PostStore();
    const post = await postStore.show(parseInt(id));
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, body, image_url, author_id } = req.body;
    console.log("author_id", author_id);
    const { error } = validatePost({ author_id, body });
    if (error) throw new Error(error.details[0].message);
    const postStore = new PostStore();
    const inputPost = { title, body, image_url, author_id };
    const post = await postStore.create(inputPost);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { id: author_id } = req.body.user as any;
    const { body } = req.body;
    const { error } = validatePost({ author_id, body });
    if (error) throw new Error(error.details[0].message);
    const postStore = new PostStore();
    const post = await postStore.update(parseInt(id), req.body);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const postStore = new PostStore();
    const deleted = await postStore.delete(parseInt(id));
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};

export { index, show, create, update, deletePost };
