import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import IUser from "../interface/user.interface";
import { checkUser, createUser } from "../controller/user.controller";
import generateToken from "../utils/jwt.util";
import { validateRequest } from "../middleware/validate";
import { LoginDto, RegisterDto } from "../dto/auth.dto";

const router = Router();
router.post(
  "/register",
  validateRequest(RegisterDto),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = req.body as IUser;
      const checkEmail = await checkUser(user.email);
      if (checkEmail) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "This email already exists",
          data: null,
        });
      }
      // Hash the password before saving
      const saltRound = 10;
      user.password = await bcrypt.hash(user.password, saltRound);

      //create new user
      const newUser = await createUser(user);
      return res.status(201).json({
        status: 201,
        success: true,
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      console.log(`Register user error`, error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error occurred, please check logs";
      return res.status(400).json({
        status: 400,
        success: false,
        message: errorMessage,
        data: null,
      });
    }
  }
);

router.post(
  "/login",
  validateRequest(LoginDto),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;
      const user = await checkUser(email);
      if (!user) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "User not found",
          data: null,
        });
      }
      // compare hashed password
      const isPaaswordMatched = await bcrypt.compare(password, user.password);
      if (!isPaaswordMatched) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid email or password",
          data: null,
        });
      }
      const token = generateToken(user.id.toString(), user.email, user.name);
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Login successful",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          token,
        },
      });
    } catch (error) {
      console.log(`Login user error`, error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error occurred, please check logs";
      return res.status(400).json({
        status: 400,
        success: false,
        message: errorMessage,
        data: null,
      });
    }
  }
);

export default router;
