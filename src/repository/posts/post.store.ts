import Post from "../../../models/post";
import { validatePost } from "../../validation";
import User from "../../../models/user";
export default class PostStore {
  async index() {
    try {
      const posts = await Post.findAll({});
      console.log("posts are: ", posts);
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error(`An Error Occurred. ${error}`);
    }
  }
  async show(id: number) {
    try {
      const post = await Post.findByPk(id);
      return post;
    } catch (error) {
      throw new Error(`Couldn't find post. ${error}`);
    }
  }

  async create(post: any) {
    try {
      const { author_id } = post;
      const foundAuthor = await User.findByPk(author_id);
      if (!foundAuthor) throw new Error(`Couldn't find author ${author_id}`);
      const newPost = await Post.create(post);
      return newPost;
    } catch (error) {
      throw new Error(`Couldn't create post. ${error}`);
    }
  }
  async update(id: number, post: any) {
    try {
      const foundPost = await Post.findByPk(id);
      if (!foundPost) throw new Error(`Couldn't find post ${id}`);
      const updatedPost = await foundPost.update(post);
      return updatedPost;
    } catch (error) {
      throw new Error(`Couldn't update post ${id}. ${error}`);
    }
  }

  async delete(id: number) {
    try {
      const foundPost = await Post.findByPk(id);
      if (!foundPost) throw new Error(`Couldn't find post ${id}`);
      await foundPost.destroy();
      return true;
    } catch (error) {
      throw new Error(`Couldn't delete post ${id}. ${error}`);
    }
  }
}
