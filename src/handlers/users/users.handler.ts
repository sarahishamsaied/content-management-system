import { Request, Response } from "express";
import User, { UserAttributes } from "../../../models/user";
import UserStore from "../../repository/users/user.store";
import errors from "http-errors";
const index = async (req: Request, res: Response) => {
  try {
    const userStore = new UserStore();
    const users: Array<User> = await userStore.index();
    res.json(users);
  } catch (error) {
    errors.InternalServerError("Internal Server Error");
  }
};
const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {
      email,
      password,
      first_name,
      last_name,
      username,
      country,
      city,
      bio,
    } = req.body;
    const user: UserAttributes = {
      email,
      password,
      first_name,
      last_name,
      username,
      country,
      city,
      bio,
      is_verified: false,
      is_banned: false,
      two_factor_enabled: false,
      is_admin: false,
    };
    const userStore = new UserStore();
    const created = await userStore.create(user);
    res.json(created);
  } catch (error) {
    console.log(error);
    errors.InternalServerError("Internal Server Error");
  }
};
export { index, create };
