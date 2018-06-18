'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
//have to import the 3 libraries above as you'll be 
//handling requests here 
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.email, // <-this could be wrong
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
//the user provides an email and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  //res.json({authToken}); <-how it was before I added user id
  //I am leaving this here to remind me to ask about it b/c maybe it's a 
  //bad practice
  res.json({authToken,
    user_id: req.user.id,
    email: req.user.email,
    prototypes_id: req.user.proto_ids
  });
  

});

const jwtAuth = passport.authenticate('jwt', {session: false});

//here's how the user exchanges a valid JWT for a new one with a later
//expiration date
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};