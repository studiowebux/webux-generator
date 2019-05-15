// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: error.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const logger = require('../thirdParty/logger');
// eslint-disable-next-line no-unused-vars
const timestamp = require('console-timestamp');

// / Permettre la gestion des erreurs facilement
// / Code: LE CODE HTTP ex. 200, 201, 203, ...
// / Message : Le message d'erreur
// / DevMessage : Le message d'erreur pour le dévelopement
module.exports = function(page, code, message, devMessage) {
  try {
    logger.log(
      'error',
      '| ' +
        page +
        ' | ' +
        code +
        ' --> ' +
        message +
        ' | ' +
        devMessage +
        ' @ ' +
        'DD-MM-YY hh:mm'.timestamp
    );
    const error = new Error();
    // Création de l'objet
    error.code = code;
    error.message = message;
    error.devMessage = devMessage;
    return error; // retourne l'objet en JSON
  } catch (e) {
    logger.log('error', e);
    return null;
  }
};
