import User from "../../../models/user";
export default class UserStore {
  async index(): Promise<Array<User>> {
    try {
      const users: Array<User> = await User.findAll({});
      if (users) {
        return users;
      }
      return [];
    } catch (error) {
      throw new Error(`Could not find users. Error: ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const user: User = (await User.findByPk(id)) as User;
      return user ? user : ({} as User);
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const newUser: User = await User.create(user);
      return newUser;
    } catch (error) {
      throw new Error(`Could not create new user. Error: ${error}`);
    }
  }
  async update(id: number, user: User): Promise<User> {
    try {
      const userToUpdate: User = (await User.findByPk(id)) as User;
      if (!userToUpdate) throw new Error(`Could not find user ${id}`);
      const updatedUser: User = await userToUpdate.update(user);
      return updatedUser;
    } catch (error) {
      throw new Error(`Could not update user ${id}. Error: ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const userToDelete: User = (await User.findByPk(id)) as User;
      if (!userToDelete) throw new Error(`Could not find user ${id}`);
      await userToDelete.destroy();
    } catch (error) {
      throw new Error(`Could not delete user ${id}. Error: ${error}`);
    }
  }
}
