import { Request, Response, NextFunction } from "express";
import PostStore from "../../repository/posts/post.store";
const checkOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    console.log("user", user);
    const postStore = new PostStore();
    const post = await postStore.show(parseInt(id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author_id !== (user as any).id)
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
export default checkOwnership;
