const logger = require('../thirdParty/logger');
const i18n = require('i18n');

const errorHandling = (app) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    logger.error('error', 'Route Not Found, Please Refer To Documentation.');
    const err = new Error('Route Not Found, Please Refer To Documentation.');
    err.status = 404;
    err.message = i18n.__('ROUTE_NOT_FOUND');
    return next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (
    app.get('env') === 'development' ||
    app.get('env') === 'docker' ||
    app.get('env') === 'test'
  ) {
    app.use((err, req, res, next) => {
      // logger.log('error', err);
      return res.status(err.code || 500).json({
        message: err.message,
        devMessage: err.devMessage,
        success: false,
        error: err,
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  if (app.get('env') === 'production') {
    app.use((err, req, res, next) => {
      logger.error('error', err);
      return res.status(err.code || 500).json({
        message: err.message,
        success: false,
      });
    });
  }
};

module.exports = {
  errorHandling,
};
