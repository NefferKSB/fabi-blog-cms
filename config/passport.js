const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      User = require('../models/user'),
      settings = require('../config/settings'),
      opts = {};
    
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Bearer');
      opts.secretOrKey = settings.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
            User.findById(jwt_payload.data._id)
                .then(user => {
                    if(user)
                        return done(null, user);
                    return done(null, false);
                })
                .catch(err => console.log(err));
        });
    }));
};