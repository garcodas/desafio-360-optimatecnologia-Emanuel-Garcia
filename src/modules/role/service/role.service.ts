import { Op } from "sequelize";
import { Role } from "../model/role.model";
import { RoleResponse } from "../response/role.response";

export class RoleService {
  async getRoleByName(searchQuery: string): Promise<RoleResponse | null> {
    try {
      const role = await Role.findOne({
        where: {
          Name: searchQuery,
        },
      });

      return role;
    } catch (error) {
      throw new Error("Ocurrio un error al buscar el rol");
    }
  }
  async getRoleById(roleId: number): Promise<RoleResponse | null> {
    try {
      const role = await Role.findOne({
        where: {
          Id: roleId,
        },
      });

      return role;
    } catch (error) {
      throw new Error("Ocurrio un error al buscar el rol");
    }
  }

  async getRoles(): Promise<RoleResponse[]> {
    try {
      const roles = await Role.findAll();

      return roles;
    } catch (error) {
      throw new Error("Ocurrio un error al buscar los roles");
    }
  }
}
