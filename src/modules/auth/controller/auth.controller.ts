import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private authService = new AuthService();

  async registerUser(req: Request, res: Response) {
    try {
      const user = await this.authService.registerUser(req.body);
      res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      res.status(200).json({
        message: "User logged in successfully",
        data: user,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }
}
