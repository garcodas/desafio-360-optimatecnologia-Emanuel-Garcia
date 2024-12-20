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
}
