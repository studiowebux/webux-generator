// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: redis.js
 * Author: Tommy Gingras
 * Date: 2018-11-26
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const config = require('../../config/config');
const logger = require('./logger');

// configuration definition
const redisConf = config.redis;
// if no redis server is available exit the web app.
redisConf.retry_strategy = (options) => {
  if (options.error && options.error.code === 'ECONNREFUSED') {
    logger.log('error', 'WARNING : Redis Server Connection Refused');
    process.exit(2);
  } else if (options.total_retry_time > 1000 * 60 * 60) {
    // End reconnecting after a specific timeout and flush all commands
    // with a individual error
    logger.log(
      'error',
      'WARNING : Redis Server Connection Retry time exhausted'
    );
    process.exit(2);
  } else if (options.attempt > 3) {
    logger.log('error', 'WARNING : Redis Server Connection Lost.');
    process.exit(3);
  } else {
    logger.log('error', 'WARNING : Redis Server Connection error occur.');
    logger.log('error', options);

    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
};

// try to connect redis with the app.
const redisConnection = require('redis').createClient(redisConf);

// Listener
redisConnection.on('ready', () => {
  logger.log('info', 'Redis Connection Ready.');
});

redisConnection.on('error', (err) => {
  logger.log('error', err);
  logger.log('error', 'Redis Detect an error.');
});

redisConnection.on('warning', (warn) => {
  logger.log('error', warn);
  logger.log('error', 'Redis Detect a warning.');
});

// return redis instance.
module.exports = redisConnection;
