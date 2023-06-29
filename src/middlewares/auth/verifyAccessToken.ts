import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validateAuthenticationToken } from "../../validation";
import errors from "http-errors";
import CustomRequest from "../../types/CustomRequest";

const verifyAccessToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("auth", authHeader);
  if (authHeader) {
    const { error, value } = validateAuthenticationToken({
      token: authHeader.split(" ")[1],
    });
    if (error) res.status(401).json({ message: "Unauthorized Access" });
    const token = authHeader.split(" ")[1];
    console.log("token secret here->>>>>>>>>>>", process.env.TOKEN_SECRET);
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
      if (err) {
        console.log("eeror here------------------>");
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user as object;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
export default verifyAccessToken;
