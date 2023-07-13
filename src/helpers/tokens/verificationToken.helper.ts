import jwt from "jsonwebtoken";

export const generateVerificationToken = async (
  user_id: number
): Promise<string> => {
  const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};
interface DecodedToken {
  user_id: number;
  iat: number;
  exp: number;
}
export const decodeVerificationToken = async (
  token: string
): Promise<DecodedToken> => {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
  return decoded as DecodedToken;
};

export default {
  generateVerificationToken,
  decodeVerificationToken,
};
