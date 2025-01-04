import { QueryTypes } from "sequelize";
import sequelize from "../../../config/database";
import { User } from "../../../types/User";
import dayjs from "dayjs";

class UserService {
  async getUser(id: number) {
    try {
      const user = await sequelize.query<User>(
        `
                SELECT * FROM [User] WHERE Id = :Id`,
        {
          replacements: {
            Id: id,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return {
        FullName: user[0].FullName,
        Email: user[0].Email,
        Phone: user[0].Phone,
        BirthDate: dayjs(user[0].BirthDate).format("YYYY-MM-DD"),
        RoleId: user[0].RoleId,
        StatusId: user[0].StatusId,
      };
    } catch (error: any) {
      throw new Error("Error getting user" + error.message);
    }
  }
}

export default UserService;
