import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { envs } from "../config/envs";
import passport from "passport";
import { User } from "../modules/user/model/user.model";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envs.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findOne({ where: { Id: payload.id } });
      if (user) {
        return done(null, user);
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
