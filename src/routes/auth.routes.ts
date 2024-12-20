import { Router } from "express";
import { AuthController } from "../modules/auth/controller/auth.controller";
import { validateDTO } from "../middlewares/validation.middleware";
import { RegisterUserDto } from "../modules/auth/dto/register-user-dto";
import { LoginUserDto } from "../modules/auth/dto/login-user-dto";

const authRouter = Router();
const authController = new AuthController();

//POST /api/auth/signup
authRouter.post(
  "/signup",
  validateDTO(RegisterUserDto),
  authController.registerUser.bind(authController)
);

//POST /api/auth/signin
authRouter.post(
  "/signin",
  validateDTO(LoginUserDto),
  authController.login.bind(authController)
);

export default authRouter;
