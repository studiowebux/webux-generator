// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: cache.js
 * Author: Tommy Gingras
 * Date: 2019-02-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const logger = require('../thirdParty/logger');
const redisClient = require('../thirdParty/redis');
const config = require('../../config/config');

try {
  if (config.cache.enabled) {
    let cache = null;
    cache = require('express-redis-cache')({
      client: redisClient,
      expire: {
        '200': 300,
        '4xx': 1,
        '403': 300,
        '5xx': 10,
        'xxx': 1,
      },
    });

    cache.on('error', function(error) {
      logger.log('error', 'WARNING : Cache error' + error);
    });

    cache.on('connect', () => {
      logger.log('info', 'Redis Connected !');
    });

    cache.on('message', function(message) {
      logger.log('info', message);
    });

    module.exports = cache.route({
      prefix: false,
    });
  } else {
    logger.log('info', 'caching disabled.');
    module.exports = (req, res, next) => {
      return next();
    };
  }
} catch (e) {
  console.log('error', e);
  return;
}
