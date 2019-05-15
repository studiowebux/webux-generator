/* eslint-disable max-len */
// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: limiter.js
 * Author: Tommy Gingras
 * Date: 2019-02-21
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const rateLimit = require('express-rate-limit');
const config = require('../../config/config');

const authLimiter = rateLimit({
  windowMs: config.limiter.auth * 1000, // 1 hour
  max: config.limiter.authReq,
  skip: (req) => {
    if (req.originalUrl.indexOf(config.version + '/auth') === -1) {
      return true;
    }
    return false;
  },
});


const globalLimiter = rateLimit({
  windowMs: config.limiter.global * 1000, // 1 minute
  max: config.limiter.globalReq,
});

module.exports = {
  authLimiter,
  globalLimiter,
};
