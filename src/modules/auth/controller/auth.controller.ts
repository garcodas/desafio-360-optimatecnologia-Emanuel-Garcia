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

  async logout(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization;
      const token = authorization?.split(" ")[1];
      console.log("token", token);

      await this.authService.logout(token ?? "");
      res.status(200).json({
        message: "User logged out successfully",
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const authorization = req.headers.authorization;
      const token = authorization?.split(" ")[1];
      console.log("token", token);

      const user = await this.authService.getUserByToken(token ?? "");
      res.status(200).json({
        message: "User fetched successfully",
        data: user,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this.authService.updateUser(+id, req.body);
      res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this.authService.getUserById(+id);
      res.status(200).json({
        message: "User fetched successfully",
        data: user,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.authService.deleteUser(+id);
      res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }

  async registeAdmin(req: Request, res: Response) {
    try {
      const user = await this.authService.registerAdminUser(req.body);
      res.status(201).json({
        message: "Admin registered successfully",
        data: user,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }
}
