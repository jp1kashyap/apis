import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "test-secret";

// generate JWT token
const generateToken = (userId: string, email: string, name: string): string => {
  return jwt.sign({ userId, name, email }, SECRET, {
    expiresIn: "1h",
  });
};

export default generateToken;
