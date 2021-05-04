const keys = require('../config/keys')
const patientRepository = require('../repositories/patientRepository')

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwt;

module.exports = passport =>
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const user = await patientRepository.get(jwt_payload.id);

        try {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (e) {
            console.log(e)
        }
    }));