'use strict';

var express = require('express');
var controller = require('./tracking.controller');
import * as auth from '../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/findbytracking/:bill', auth.isAuthenticated(), controller.FindByTrackingNumber);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/updatetracking/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
