import Post from "../../../models/post";
import { validatePost } from "../../validation";
import User from "../../../models/user";
import Comment from "../../../models/comment";
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
      const post = await Post.findByPk(id, {
        include: {
          model: Comment,
          as: "comments",
        },
      });
      return post;
    } catch (error) {
      throw new Error(`Couldn't find post. ${error}`);
    }
  }

  async create(post: any) {
    try {
      const { author_id } = post;
      console.log(author_id);
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
  async authorPosts(id: number): Promise<Post[]> {
    try {
      const author = await User.findByPk(id);
      if (!author) throw new Error("Cannot find user");
      const posts = await Post.findAll({
        where: {
          author_id: id,
        },
      });
      return posts;
    } catch (error) {
      throw new Error(`An error occurred, Error: ${error}`);
    }
  }
  async showPostComments(id: number): Promise<Comment[]> {
    try {
      const foundPost = await Post.findByPk(id);
      if (!foundPost) throw new Error("Cannot find post");
      const comments = await Comment.findAll({
        where: {
          post_id: id,
        },
      });
      return comments;
    } catch (error) {
      throw new Error(`An error occurred, Error: ${error}`);
    }
  }
}
