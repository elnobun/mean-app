/* Create a JWT Strategy that will be extracted from the header where the token is gotten from */

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);
      // Use the log to check the outcome of the payload to be used to get User Id.
      // Mine was "_doc._id"
    User.getUserId(jwt_payload._doc._id, function (err, user) {
        if (err){
          return done(err, done);
        }

        if (user){
          return done(null, user);
        } else {
          return done(null, false);
        }
    });
  }));
};

