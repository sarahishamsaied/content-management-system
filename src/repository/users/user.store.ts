import User, { UserAttributes } from "../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserWithoutPassword } from "../../types/userTypes";
export default class UserStore {
  async index(): Promise<Array<User>> {
    try {
      const users = await User.findAll({});
      console.log("users are: ", users);
      if (users) return users;
      return [];
    } catch (error) {
      console.log(error);
      throw new Error(`Could not find users. ${error}`);
    }
  }
  async generateAuthToken(user: User): Promise<string> {
    try {
      console.log("user issss");
      const token = jwt.sign(
        user.dataValues,
        process.env.TOKEN_SECRET as string
      );
      return token;
    } catch (error) {
      throw new Error(`Could not generate token. ${error}`);
    }
  }
  async authenticate(email: string, password: string): Promise<User> {
    try {
      const foundUser = await User.findOne({ where: { email: email } });
      if (!foundUser) throw new Error(`Could not find user ${email}`);
      if (!bcrypt.compareSync(password, foundUser.password))
        throw new Error(`Password is incorrect`);
      console.log("found user is", foundUser);
      return foundUser;
    } catch (error) {
      console.log(error);
      throw new Error(`Could not authenticate user ${email}. Error: ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const user: User = (await User.findByPk(id)) as User;
      if (!user) throw new Error(`Could not find user ${id}`);
      return user;
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error: ${error}`);
    }
  }
  async emailExists(email: string): Promise<boolean> {
    const user: User = (await User.findOne({
      where: { email: email },
    })) as User;
    return user ? true : false;
  }

  async create(user: UserAttributes): Promise<UserWithoutPassword> {
    try {
      console.log("user is", user);
      const doesEmailExist = await this.emailExists(user.email);
      if (doesEmailExist) throw new Error(`Email ${user.email} already exists`);
      const newUser: User = await User.create(user);
      const { password, ...userWithoutPassword } = newUser.dataValues;
      return userWithoutPassword;
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
