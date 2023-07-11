import Like from "../../../models/like";
import Post from "../../../models/post";
export default class LikeStore {
  async index(): Promise<Like[]> {
    try {
      const likes = await Like.findAll({});
      return likes;
    } catch (error) {
      throw new Error("Error finding likes");
    }
  }
  async show(id: number): Promise<Like> {
    try {
      const like = await Like.findByPk(id);
      if (!like) throw new Error("Cannot find like");
      return like;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async create(like: Like): Promise<Like> {
    try {
      const foundPost = await Post.findByPk(like.post_id);
      if (!foundPost) throw new Error("Cannot find post");
      const createdLike = await Like.create(like);
      return createdLike;
    } catch (error) {
      throw new Error(`Error liking post, Error: ${error}`);
    }
  }
  async remove(id: number): Promise<void> {
    try {
      const foundLike = await Like.findByPk(id);
      if (!foundLike) throw new Error(`Cannot find like`);
    } catch (error) {
      throw new Error(`Cannot remove like, Error: ${error}`);
    }
  }
}
