import { Request, Response } from "express";
import { RoleService } from "../service/role.service";

export class RoleController {
  private roleService = new RoleService();

  async getRoles(req: Request, res: Response) {
    try {
      const roles = await this.roleService.getRoles();
      res.status(200).json({
        data: roles,
      });
    } catch (error: any) {
      res.status(400).json({ message: "Error", error: error.message });
    }
  }
}
