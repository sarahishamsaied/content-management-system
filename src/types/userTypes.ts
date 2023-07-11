import { UserAttributes } from "../../models/user";

export interface UserWithoutPassword extends Omit<UserAttributes, "password"> {}

export interface UserAttributesWithId extends Omit<UserAttributes, "password"> {
  id: number;
}
