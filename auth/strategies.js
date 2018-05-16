'use strict';

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../users/models');
const { JWT_SECRET } = require('../config'); 

const localStrategy = new LocalStrategy((username, password, callback) => {
  let user;
  User.findOne({ username: username })
    .then(_user => {
      user = user;
      if(!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Bad username or password'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if(!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Inocrrect username or password'
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if(err.reason === 'LoginError') {
        return callback(err, false)
      }
    });
});


const jwtStrategy = new JwtStrategy({
  secretOrKey: JWT_SECRET,
  //here looking for the JWT as a Bearer auth header
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256'] //I issue HS256 tokens, so that's what I am allowing
},
(payload, done) => {
  done(null, payload.user);
}
);

module.exports = { localStrategy, jwtStrategy };

