import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { envs } from "../config/envs";
import passport from "passport";
import UserSessionService from "../modules/userSession/service/user-session.service";
import UserService from "../modules/user/service/user.service";

const userSessionService = new UserSessionService();
const userService = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envs.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await userService.getUser(payload.id);
      if (user) {
        return done(null, user);
      }

      const userSession = await userSessionService.getUserSessionByToken(
        payload.token
      );

      if (userSession) {
        if (userSession.ExpiresAt < new Date()) {
          return done(new Error("Unauthorized"), false);
        } else {
          return done(null, user);
        }
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const passportMiddleware = passport.authenticate("jwt", {
  session: false,
});
