'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models.js');

const router = express.Router();

const jsonParser = bodyParser.json();


//here we are posting to register a new user
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['email', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  //so this above iterates through the properties of the request body
  //object, grabs each one out, and field => !(field in req.body) and with 
  //that says if field is not in the request body than it returns true and 
  //puts the field in the missingField constant

  if(missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['email', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if(nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });  
  }

  const trimmedFields = ['email', 'password'];
  const nonTrimmedFields = trimmedFields.find(field => req.body[field].trim() !== req.body[field]);

  if(nonTrimmedFields) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedFields
    });
  }

  const sizedFields = {
    email: {
      min: 5
    },
    password: {
      min: 6,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field] && 
    req.body[field].trim().length < sizedFields[field].min);
  const tooLargeField = Object.keys(sizedFields).find(
    field => 'max' in sizedFields[field] && 
    req.body[field].trim().length > sizedFields[field].max);
  if(tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
      ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
      : `Must be at most ${sizedFields[tooLargeField]} characters long`,
      location: tooSmallField || tooLargeField
    });  
  }

  let {email, password, firstName = '', lastName = ''} = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({email})
    .count()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'email'
        });
      }
      //if the username is not taken
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        email, 
        password: hash,
        firstName,
        lastName
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      //Here we forward the validation error to the client 
      if(err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

module.exports = {router};