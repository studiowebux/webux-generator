// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: i18n.js
 * Author: Tommy Gingras
 * Date: 2019-02-22
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const i18n = require('i18n');
const config = require('../../config/config');
const path = require('path');

i18n.configure({
  locales: config.locales.availables,
  directory: path.join(config.path, config.locales.directory),
  defaultLocale: config.locales.default,
  autoReload: config.locales.autoReload,
  syncFiles: config.locales.syncFiles,
  logDebugFn: (msg) => console.log('debug', msg),
});

module.exports.init = (req, res, next) => i18n.init;

module.exports.setLocale = (req) => i18n.setLocale(req.headers.lang || 'en');
