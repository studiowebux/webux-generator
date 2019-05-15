//  █████╗ ██████╗ ██████╗
// ██╔══██╗██╔══██╗██╔══██╗
// ███████║██████╔╝██████╔╝
// ██╔══██║██╔═══╝ ██╔═══╝
// ██║  ██║██║     ██║
// ╚═╝  ╚═╝╚═╝     ╚═╝

/**
 * File: app.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

try {
  const express = require('express');
  const config = require('./config/config');
  const path = require('path');
  const logger = require('./middleware/thirdParty/logger');
  const appRoutes = require('./routes/index');
  const routes = require('./config/routes.json');
  const app = express();
  const rateLimiter = require('./middleware/init/limiter');
  const {init} = require('./middleware/init');
  const {errorHandling} = require('./middleware/init/errorHandling');

  init(app);

  // Routes
  // routes definitions
  routes.forEach((route) => {
    if (route) {
      if (config.limiter.enabled) {
        app.use(
          config.version + '/' + route.module,
          rateLimiter.authLimiter,
          rateLimiter.globalLimiter,
          require(path.join(__dirname, 'routes', route.module))
        );
        logger.log(
          'info',
          'Route-> Module : ' + route.module + ' with limiter Loaded'
        );
      } else {
        app.use(
          config.version + '/' + route.module,
          require(path.join(__dirname, 'routes', route.module))
        );
        logger.log('info', 'Route-> Module : ' + route.module + ' Loaded');
      }
    }
  });

  // the uploaded files are available in that path. we can enable caching on that directory from the proxy server.
  app.use('/static', express.static('uploads'));

  app.use('/', appRoutes);

  errorHandling(app);

  module.exports = app;
} catch (e) {
  console.error(e);
  process.exit(100);
}
