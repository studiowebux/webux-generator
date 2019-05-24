// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: logger.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, prettyPrint} = format;
const config = require('../../config/config');
const LogstashTransport = require('./transport/logstash');

const logger = createLogger({
  format: combine(
    label({label: config.application_id}),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      level: 'error',
      filename: 'log/error.log',
    }),
    new transports.File({
      level: 'info',
      filename: 'log/access.log',
    }),
    new LogstashTransport(),
  ],
});

if (process.env.NODE_ENV != 'production') {
  logger.add(
    new transports.Console({
      level: 'debug',
    })
  );
}

logger.stream = {
  write: (message, encoding) => {
    try {
      logger.info(message);
    } catch (e) {
      logger.error(e);
    }
  },
};

module.exports = logger;
