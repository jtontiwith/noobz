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
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
//the user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

//here's how the user exchanges a valid JWT for a new one with a later
//expiration date
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
})

module.exports = {router};