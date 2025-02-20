import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import IAuthUser from "../interface/auth-user.interface";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

interface AuthRequest extends Request {
  user?: IAuthUser;
}

const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): any => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET) as IAuthUser;
    next();
  } catch (error) {
    console.log(error);

    return res.status(403).json({
      status: 403,
      success: false,
      message: "Invalid token.",
      data: null,
    });
  }
};

export default authenticate;
