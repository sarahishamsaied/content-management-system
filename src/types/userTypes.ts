import { UserAttributes } from "../../models/user";

export interface UserWithoutPassword extends Omit<UserAttributes, "password"> {}
