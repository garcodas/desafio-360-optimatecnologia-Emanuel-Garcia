import { QueryTypes } from "sequelize";
import sequelize from "../../../config/database";
import { Role } from "../../../types/Role";
export class RoleService {
  async getRoleByName(searchQuery: string): Promise<Role | null> {
    try {
      const role = await sequelize.query<Role>(
        "SELECT * FROM Role WHERE Name = :Name",
        {
          replacements: { Name: searchQuery },
          type: QueryTypes.SELECT,
        }
      );

      return role[0];
    } catch (error) {
      throw new Error("Ocurrio un error al buscar el rol");
    }
  }
  // async getRoleById(roleId: number): Promise<RoleResponse | null> {
  //   try {
  //     const role = await Role.findOne({
  //       where: {
  //         Id: roleId,
  //       },
  //     });

  //     return role;
  //   } catch (error) {
  //     throw new Error("Ocurrio un error al buscar el rol");
  //   }
  // }

  // async getRoles(): Promise<RoleResponse[]> {
  //   try {
  //     const roles = await Role.findAll();

  //     return roles;
  //   } catch (error) {
  //     throw new Error("Ocurrio un error al buscar los roles");
  //   }
  // }
}
