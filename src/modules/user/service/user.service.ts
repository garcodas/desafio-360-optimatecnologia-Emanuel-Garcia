import { QueryTypes } from "sequelize";
import sequelize from "../../../config/database";
import { User, UserQueryResponse } from "../../../types/User";
import dayjs from "dayjs";

class UserService {
  async getUser(id: number): Promise<User | null> {
    try {
      const user = await sequelize.query<User>(
        `SELECT * FROM [User] WHERE Id = :Id`,
        {
          replacements: {
            Id: id,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (!user) {
        return null;
      }
      return {
        FullName: user[0].FullName,
        Email: user[0].Email,
        Phone: user[0].Phone,
        BirthDate: dayjs(user[0].BirthDate).toDate(),
        RoleId: user[0].RoleId,
        StatusId: user[0].StatusId,
      };
    } catch (error: any) {
      throw new Error("Error getting user" + error.message);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const usersQueryResult = await sequelize.query<UserQueryResponse>(
        `SELECT 
          U.*,
          S.Name AS StatusName,
          R.Name AS RoleName
            FROM  [User] U
            INNER JOIN [Status] S ON S.Id = U.StatusId
            INNER JOIN [Role] R ON R.Id = U.RoleId	
        `,
        {
          type: QueryTypes.SELECT,
        }
      );

      const users: User[] = usersQueryResult.map((user) => ({
        Id: user.Id,
        Email: user.Email,
        FullName: user.FullName,
        Phone: user.Phone,
        BirthDate: user.BirthDate,
        RoleId: user.RoleId,
        StatusId: user.StatusId,
        Status: {
          Id: user.StatusId,
          Name: user.StatusName,
        },
        Role: {
          Id: user.RoleId,
          Name: user.RoleName,
        },
      }));

      return users;
    } catch (error: any) {
      throw new Error("Error getting user" + error.message);
    }
  }

  async changeStatusUser(userId: number, statusId: number) {
    try {
      const user = await this.getUser(userId);

      if (!user) {
        throw new Error("Error to update User");
      }

      await sequelize.query(
        `
        EXEC UpdateUser
          @Id = :Id,
          @Email = :Email,
          @FullName = :FullName,
          @Phone = :Phone,
          @BirthDate = :BirthDate,
          @RoleId = :RoleId,
          @StatusId = :StatusId,
          @ClientId = :ClientId
        `,
        {
          replacements: {
            Id: userId,
            Email: user.Email,
            FullName: user.FullName,
            Phone: user.Phone,
            BirthDate: user.BirthDate,
            RoleId: user.RoleId,
            StatusId: statusId,
          },
        }
      );
    } catch (error: any) {
      throw new Error("Error to update User: " + error);
    }
  }
}

export default UserService;
