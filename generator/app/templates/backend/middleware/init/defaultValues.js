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
const events = require('events');
const path = require('path');

// It load all the default values availables in the defaults folder
function loadDefaultValues(next) {
  logger.log('info', 'DB : Loading Default Values...');
  const files = fs.readdirSync(path.join(__dirname, '/../../defaults/')).sort();
  files.forEach(async (filename) => {
    if (filename.indexOf('.js') > -1) {
      const _default = require(path.join(
        __dirname,
        '/../../defaults/',
        filename
      ));

      try {
        const result = await _default();
        if (!result) {
          logger.log('error', 'Default values : ' + filename + ' Not Imported properly.');
          throw Error('No result returned...');
        }

        logger.log('info', 'Default values : ' + filename + ' Imported.');
        return next();
      } catch (e) {
        logger.log('error', e);
        logger.log('error', 'Default values : ' + filename + ' Not Imported properly.');
        throw e;
      }
    } else {
      logger.log('warn', 'Skip ' + filename);
    }
  });
}

module.exports = new events.EventEmitter();

module.exports.load = () => {
  loadDefaultValues((err) => {
    if (!err) {
      module.exports.emit('loaded');
    } else {
      console.log(err);
      logger.log('error', err);
    }
  });
};
