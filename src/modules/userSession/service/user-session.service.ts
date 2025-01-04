import { QueryTypes } from "sequelize";
import sequelize from "../../../config/database";
import { UserSession } from "../../../types/UserSession";
import { CreateUserSessionDto } from "../dto/create-user-session.dto";
import { InsertType } from "../../../types/InsertType";
import dayjs from "dayjs";

class UserSessionService {
  async createUserSession(
    userSessionDto: CreateUserSessionDto
  ): Promise<UserSession> {
    try {
      const newUserSession = await sequelize.query<InsertType>(
        `EXEC InsertUserSession
          @Token = :Token, 
          @UserId = :UserId, 
          @ExpiresAt = :ExpiresAt`,
        {
          replacements: {
            Token: userSessionDto.Token,
            UserId: userSessionDto.UserId,
            ExpiresAt: userSessionDto.ExpiresAt,
          },
          type: QueryTypes.SELECT,
        }
      );

      return {
        Token: userSessionDto.Token,
        UserId: userSessionDto.UserId,
        ExpiresAt: dayjs(userSessionDto.ExpiresAt).toDate(),
      };
    } catch (error: any) {
      console.log(error);
      throw new Error("Error saving user session" + error.message);
    }
  }
  async getUserSessionByToken(token: string): Promise<UserSession | null> {
    try {
      const userSession = await sequelize.query<UserSession>(
        `
        SELECT * FROM UserSession WHERE Token = :Token`,
        {
          replacements: {
            Token: token,
          },
          type: QueryTypes.SELECT,
        }
      );
      return userSession[0];
    } catch (error: any) {
      throw new Error("Error getting user session" + error.message);
    }
  }
  async deleteUserSession(token: string): Promise<boolean> {
    try {
      await sequelize.query(
        `EXEC DeleteUserSession
          @Token = :Token`,
        {
          replacements: {
            Token: token,
          },
          type: QueryTypes.SELECT,
        }
      );
      return true;
    } catch (error: any) {
      throw new Error("Error deleting user session" + error.message);
    }
  }
}

export default UserSessionService;
