// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-05-25
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const StatsD = require('node-statsd');
const stats = new StatsD();
const safe = require('safe-regex');
const getIP = require('../tools/IP');
const logger = require('../thirdParty/logger');
const config = require('../../config/config');
const i18n = require('i18n');
const path = require('path');
const language = require('./language');

const init = (app) => {
  if (!config.sm.enabled) {
    logger.log(
      'info',
      'SENDMAIL : WARNING ! Email is not enable so no one will receive email. Change the configuration !'
    );
  }

  // cors setup
  const corsOptions = {
    origin: function(origin, callback) {
      if (config.origin.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        logger.log('error', 'Not allowed by CORS - ' + origin);
        return callback(new Error('Not allowed by CORS'));
      }
    },
  };

  // Then pass them to cors:
  if (process.env.NODE_ENV === 'production') {
    app.use(cors(corsOptions));
  } else {
    logger.log('warning', 'CORS disabled.');
    app.use(cors('*'));
  }

  // language
  app.use((req, res, next) => {
    console.log('language');
    language.init;
    language.setLocale(req);
    return next();
  });

  app.use(compression());

  app.enable('trust proxy');
  app.set('trust proxy', true);

  app.use(helmet());
  app.disable('x-powered-by');

  // create a rotating write stream
  if (!config.logger.logstash.enabled) {
    const accessLogStream = rfs(config.morgan.filename, {
      interval: config.morgan.rotate, // rotate daily
      path: path.join(config.path, config.morgan.path),
    });

    app.use(
      morgan(config.morgan.type, {
        stream: accessLogStream,
      })
    );
  } else {
    app.use(
      morgan(config.morgan.type, {
        stream: logger.stream,
      })
    );
  }

  app.use(
    bodyParser.json({
      limit: config.bodyParser.limit,
    })
  );
  app.use(
    bodyParser.urlencoded({
      limit: config.bodyParser.limit,
      extended: config.bodyParser.extended,
    })
  );

  app.use(require('../tools/headers'));

  app.use((req, res, next) => {
    if (safe(req.params) && safe(req.query) && safe(req.body)) {
      return next();
    } else {
      const ip = getIP(req);
      logger.log('error', 'Regex Error' + ip);
      return res.json({
        message: i18n.__('REGEX_ERROR'),
        error: err,
      });
    }
  });

  app.use(
    responseTime(function(req, res, time) {
      const stat = (req.method + req.url)
        .toLowerCase()
        .replace(/[:\.]/g, '')
        .replace(/\//g, '_');
      stats.timing(stat, time);
      logger.info(stat + ' - ' + time);
    })
  );
};

module.exports = {
  init,
};
