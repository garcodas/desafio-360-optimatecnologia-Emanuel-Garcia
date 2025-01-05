import { Router } from "express";
import { UserController } from "../modules/user/controller/user.controller";
import { passportMiddleware } from "../middlewares/passport.middleware";

const userRouter = Router();
const userController = new UserController();

//GET /api/user
userRouter.get(
  "/",
  passportMiddleware,
  userController.getUsers.bind(userController)
);

userRouter.put(
  "/:userId/:statuId",
  passportMiddleware,
  userController.changeStatusUser.bind(userController)
);

export default userRouter;
