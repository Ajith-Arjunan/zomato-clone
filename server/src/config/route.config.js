import passport from "passport";
import JwtPassport from "passport-jwt";
import { UserModel } from "../database/allModels";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

// Authorization : "Bearer someTokenString"

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoApp",
};
export default (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwt__payload, done) => {
            try {
                const doseUserExist = await UserModel.findById(jwt__payload.user);
                if (!doseUserExist) return done(null, false)
                return done(null, doseUserExist);

            } catch (error) {
                throw new Error(error);
            }
        })
    );
};
