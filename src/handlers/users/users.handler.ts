import { Request, Response, NextFunction } from "express";
import UserStore from "../../repository/users/user.store";
import errors from "http-errors";
/**
 * Get all users.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @throws {InternalServerError} - If there is an internal server error.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const userStore = new UserStore();
    const users = await userStore.index();
    res.json(users);
  } catch (error) {
    errors.InternalServerError("Internal Server Error");
  }
};

/**
 * Create a new user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @throws {InternalServerError} - If there is an internal server error.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
const create = async (req: Request, res: Response): Promise<void> => {
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
    const user = {
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
const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userStore = new UserStore();
    const user = await userStore.show(parseInt(req.params.id));
    console.log("=============== user is ================", user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};
const deactivate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userStore = new UserStore();
    const deleted = await userStore.delete(parseInt(id));
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};
const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userStore = new UserStore();
    const user = await userStore.authenticate(email, password);
    console.log("user");
    console.log(user.password);
    // generate token
    const token = await userStore.generateAuthToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });
    console.log(res.cookie.toString());

    res.json({ token });
    // Set token in cookie
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
export { index, create, show, deactivate, login };
