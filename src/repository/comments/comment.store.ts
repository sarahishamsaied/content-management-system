import Comment from "../../../models/comment";

export default class CommentStore {
  async index(): Promise<Comment[]> {
    try {
      const data = await Comment.findAll({});
      return data;
    } catch (error) {
      throw new Error("An Error Occurred");
    }
  }
  async create(comment: Comment): Promise<Comment> {
    try {
      const addedComment = await Comment.create(comment);
      return addedComment;
    } catch (error) {
      throw new Error(`an error occurred ${error}`);
    }
  }
  async update(comment: Comment, id: number): Promise<Comment> {
    try {
      const { body } = comment;
      const found = await Comment.findByPk(id);
      if (!found) throw new Error("Cannot find comment");
      found.update({ body });
      return found;
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }
  async show(id: number): Promise<Comment> {
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) throw new Error("Comment not found");
      return comment;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async deleteComment(id: number): Promise<void> {
    try {
      const found = await Comment.findByPk(id);
      if (!found) throw new Error("Comment not found");
      await found.destroy();
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  }
}
