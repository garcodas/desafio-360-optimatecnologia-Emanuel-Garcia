import { Router } from "express";
import { AuthController } from "../modules/auth/controller/auth.controller";
import { validateDTO } from "../middlewares/validation.middleware";
import { RegisterUserDto } from "../modules/auth/dto/register-user.dto";
import { LoginUserDto } from "../modules/auth/dto/login-user.dto";
import { passportMiddleware } from "../middlewares/passport.middleware";
import { UpdateUserDto } from "../modules/auth/dto/update-user.dto";

const authRouter = Router();
const authController = new AuthController();

//POST /api/auth/signup
authRouter.post(
  "/signup",
  validateDTO(RegisterUserDto),
  authController.registerUser.bind(authController)
);

//POST /api/auth/signup/admin
authRouter.post(
  "/signup/admin",
  validateDTO(RegisterUserDto),
  authController.registeAdmin.bind(authController)
);

//POST /api/auth/signin
authRouter.post(
  "/signin",
  validateDTO(LoginUserDto),
  authController.login.bind(authController)
);

//POST /api/auth/signout
authRouter.post(
  "/signout",
  passportMiddleware,
  authController.logout.bind(authController)
);

//GET /api/auth/me
authRouter.get(
  "/me",
  passportMiddleware,
  authController.getUser.bind(authController)
);

//UPDATE /api/auth
authRouter.patch(
  "/:id",
  passportMiddleware,
  validateDTO(UpdateUserDto),
  authController.updateUser.bind(authController)
);

//DELETE /api/auth/inactive/:id
//SOFT DELETE USER BY EMANUEL GARCIA
authRouter.patch(
  "/inactive/:id",
  passportMiddleware,
  authController.deleteUser.bind(authController)
);

export default authRouter;
