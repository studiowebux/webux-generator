// ██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
// ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
// ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
// ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const express = require('express');
const router = express.Router();
const config = require('../config/config');
const errorHandler = require('../middleware/tools/error');

/* BACKEND Access */
/**
 * @apiGroup App
 * @api {get} /api/ping if the backend is still alive
 * @apiDescription return 200 if alive
 * @apiName healthcheck
 */
router.get(config.version + '/ping', function(req, res, next) {
  try {
    return res.status(200).json({
      message: 'Ok!',
    });
  } catch (e) {
    return next(errorHandler('PING', 500, 'Ooops!'));
  }
});

module.exports = router;
