import { CreateUserSessionDto } from "../dto/create-user-session.dto";
import { UserSession } from "../model/user-session.model";

class UserSessionService {
  async createUserSession(
    userSessionDto: CreateUserSessionDto
  ): Promise<UserSession> {
    try {
      const newUserSession = await UserSession.create({
        Token: userSessionDto.Token,
        UserId: userSessionDto.UserId,
        ExpiresAt: userSessionDto.ExpiresAt,
      });
      return newUserSession;
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving user session" + error.message);
    }
  }

  async getUserSessionByToken(token: string): Promise<UserSession | null> {
    try {
      const userSession = await UserSession.findOne({
        where: {
          Token: token,
        },
      });
      return userSession;
    } catch (error: any) {
      throw new Error("Error getting user session" + error.message);
    }
  }
}

export default UserSessionService;
