import { Request, Response } from "express";
import UserService from "../service/user.service";

export class UserController {
  private userService = new UserService();
  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();

      res.status(200).json(users);
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }

  async changeStatusUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const statusId = req.params.statuId;

      await this.userService.changeStatusUser(+userId, +statusId);

      res.status(200).json();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }
}
