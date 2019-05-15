//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝

/**
 * File: db.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

console.log('Loading DB');

const config = require('./config');
const fs = require('fs');
const logger = require('../middleware/thirdParty/logger');
const options = {
  keepAlive: 300000,
  socketTimeoutMS: 30000,
  replicaSet: config.db.RepSet,
  autoIndex: false,
  useNewUrlParser: true,
  reconnectTries: 30,
};

const db = require('mongoose');

db.set('debug', config.db.debug);

const LoadModels = () => {
  logger.log('info', 'DB : Loading Module...');
  let files = [];
  if (!config.db.overwrite) {
    files = fs.readdirSync(path.join(__dirname, '..', 'models'));
  } else {
    files = require('./db_models_overwrite.json');
  }
  files.forEach((filename) => {
    if (filename.indexOf('.js') > -1) {
      logger.log('info', 'try to load ' + filename);
      require(__dirname + '/../models/' + filename);
      logger.log('info', 'DB : Module : ' + filename + ' Loaded');
    } else {
      logger.log('warn', 'Skip ' + filename);
    }
  });
  return;
};

if (config.db.local) {
  const MongoInMemory = require('mongo-in-memory');
  const mongoServerInstance = new MongoInMemory();
  const opts = {
    useNewUrlParser: true,
  };

  mongoServerInstance.start((error, dbConfig) => {
    if (error) {
      logger.log(
        'error',
        'DB : An error occur while connecting to the database' +
          ' : Mongo In Memory | ' +
          error
      );
    } else {
      logger.log('info', 'DB In Memory : Database successfully started.');
      logger.log('info', 'HOST ' + dbConfig.host);
      logger.log('info', 'PORT ' + dbConfig.port);

      const mongouri = mongoServerInstance.getMongouri('localtest');

      db.connect(mongouri, opts, (err) => {
        if (err) {
          logger.log(
            'error',
            'DB : An error occur while connecting to the database' +
              ' : ' +
              config.db.URL +
              ' | ' +
              err
          );
        } else {
          logger.log('info', 'DB : Database connection success.');
          LoadModels();
          if (config.db.defaultValues) {
            require('../middleware/init/defaultValues').load();
          }
        }
      });
    }
  });
} else {
  db.connect(
    'mongodb://' +
      config.db.user +
      ':' +
      encodeURIComponent(config.db.password) +
      config.db.URL,
    options,
    (err) => {
      if (err) {
        logger.log(
          'error',
          'DB : An error occur while connecting to the database' +
            ' : ' +
            config.db.URL +
            ' | ' +
            err
        );
      } else {
        logger.log('info', 'DB : Database connection success.');
        LoadModels();
        if (config.db.defaultValues) {
          require('../middleware/init/defaultValues').load();
        }
      }
    }
  );
}

module.exports = db;
