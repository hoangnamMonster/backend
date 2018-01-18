'use strict'
import User from './user.model';
import jwt from 'jsonwebtoken';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

export function index(req, res) {
    return User.find({}, ).exec()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(handleError(res));
  }

  /**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, "uw45mypu", {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      user.token = jwt.sign({ _id: user._id,role: user.role }, "uw45mypu", {
        expiresIn: 60 * 60 * 5
      });
      res.json(user.profile);
    })
    .catch(err => next(err));
}
  