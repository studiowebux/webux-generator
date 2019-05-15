// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: defaultValues.js
 * Author: Tommy Gingras
 * Date: 2018-07-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const fs = require('fs');
const logger = require('../thirdParty/logger');
const Async = require('async');
const events = require('events');

// It load all the default values availables in the defaults folder
function loadDefaultValues(next) {
  logger.log('info', 'DB : Loading Default Values...');
  const files = fs.readdirSync(__dirname + '/../../defaults/').sort();
  Async.eachOfSeries(
    files,
    (filename, key, loop) => {
      if (filename.indexOf('.js') > -1) {
        require(__dirname + '/../../defaults/' + filename)((err) => {
          if (!err) {
            logger.log('info', 'Default values : ' + filename + ' Imported.');
          } else {
            logger.log(
              'error',
              'Default values : ' + filename + ' Not Imported.'
            );
          }
          return loop(err);
        });
      } else {
        logger.log('warn', 'Skip ' + filename);
        return loop();
      }
    },
    (err) => {
      return next(err);
    }
  );
}

module.exports = new events.EventEmitter();

module.exports.load = () => {
  loadDefaultValues((err) => {
    if (!err) {
      module.exports.emit('loaded');
    } else {
      logger.log('error', err);
    }
  });
};
