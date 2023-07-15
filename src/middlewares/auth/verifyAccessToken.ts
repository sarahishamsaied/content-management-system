import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { validateAuthenticationToken } from "../../validation";
import CustomRequest from "../../types/CustomRequest";
import User from "../../../models/user";
import axios from "axios";

const verifyAccessToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(); // No auth header, move to next middleware
  const { error, value } = validateAuthenticationToken({
    token: authHeader.split(" ")[1],
  });
  if (error) return next(); // Invalid token, move to next middleware

  const token = authHeader.split(" ")[1];
  console.log("token secret here->>>>>>>>>>>", process.env.TOKEN_SECRET);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
    if (err) return next(); // Token verification failed, move to next middleware
    req.user = user as User;
    res.locals.tokenVerified = true; // Set flag in response locals
    next();
  });
};

const verifyGoogleAccessToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Check if token is already verified by previous middleware
  if (res.locals.tokenVerified) return next();
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Missing Access Token" });
  const token = authHeader.split(" ")[1];
  try {
    const tokenInfoUri = `https://www.googleapis.com/oauth2/v1/tokeninfo`;
    const { data } = await axios.get(tokenInfoUri, {
      params: {
        access_token: token,
      },
    });
    req.user = {
      id: data.user_id,
      email: data.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};

export { verifyGoogleAccessToken, verifyAccessToken };
