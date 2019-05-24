// ████████╗███████╗███████╗████████╗███████╗
// ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
//    ██║   █████╗  ███████╗   ██║   ███████╗
//    ██║   ██╔══╝  ╚════██║   ██║   ╚════██║
//    ██║   ███████╗███████║   ██║   ███████║
//    ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚══════╝

/**
 * File: test.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

// Add your test cases here.

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../bin/www');
const logger = require('../middleware/thirdParty/logger');
const fs = require('fs');
const db = require('../config/db');
const defaultValues = require('../middleware/init/defaultValues');

const path = require('path');

// Require each modules here:
function LoadTests(chai, server) {
  logger.log('info', 'TEST : Loading Test Cases...');
  const files = fs.readdirSync(path.join(__dirname, 'cases'));
  files.forEach((filename) => {
    if (filename != 'test.js') {
      require(path.join(__dirname, 'cases', filename))(chai, server);
      logger.log('info', 'TEST : Test Cases : ' + filename + ' Loaded');
    }
    return;
  });
}

let alreadyLoaded = false;

db.connection.on('connected', function() {
  console.log('DATABASE CONNECTED...');
  defaultValues.on('loaded', function() {
    console.log('Default Values loaded.');
    server.on('listening', () => {
      console.log('Starting chai and loading test cases');
      if (!alreadyLoaded) {
        alreadyLoaded = true;
        chai.use(chaiHTTP);

        LoadTests(chai, server);
        run();
      }
    });
  });
});
