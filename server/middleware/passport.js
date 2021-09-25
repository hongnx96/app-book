const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const UserModel = require('../models/User');
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../config/variable');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //console.log('payload', payload);
        let user = await UserModel.getUserById(payload.sub);
        if(!user) done(null, false);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));