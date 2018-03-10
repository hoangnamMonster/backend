/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Trackings              ->  index
 * POST    /api/Trackings              ->  create
 * GET     /api/Trackings/:id          ->  show
 * PUT     /api/Trackings/:id          ->  upsert
 * PATCH   /api/Trackings/:id          ->  patch
 * DELETE  /api/Trackings/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Tracking from './tracking.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Trackings
export function index(req, res) {
  return Tracking.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tracking from the DB
export function show(req, res) {
  return Tracking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tracking in the DB
export function create(req, res) {
  Reflect.deleteProperty(req.body.tracking, '_id');
  return Tracking.create(req.body.tracking)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Tracking in the DB at the specified ID
export function upsert(req, res) {
  if (req.body.tracking._id) {
    Reflect.deleteProperty(req.body.tracking, '_id');
    Reflect.deleteProperty(req.body.tracking, '__v');
  }
  return Tracking.findOneAndUpdate({
      _id: req.params.id
    }, req.body.tracking, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Tracking in the DB
export function patch(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Tracking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Tracking from the DB
export function destroy(req, res) {
  return Tracking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function FindByTrackingNumber(req, res) {
  return Tracking.findOne({bill_safa:req.params.bill}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}