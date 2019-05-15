// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: sendmail.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const nodemailer = require('nodemailer');
const config = require('../../config/config');
const logger = require('../thirdParty/logger');
const i18n = require('i18n');
const FROM = config.sm.FROM;
// const STAFF = config.sm.STAFF;
const TRANSPORTER = nodemailer.createTransport({
  host: config.sm.host,
  port: config.sm.port,
  secure: config.sm.secure, // use SSL
  auth: {
    user: config.sm.user,
    pass: config.sm.pwd,
  },
});

// Send mail.
function SendMail(options, next) {
  TRANSPORTER.sendMail(options, function(error, info) {
    if (error) {
      logger.log('error', 'SENDMAIL : ' + error);
      return next(error, null);
    } else {
      logger.log('info', 'SENDMAIL : ' + info.response);
      return next(null, 'Message sent: ' + info.response);
    }
  });
}

const SendValidationCode = (email, code, next) => {
  try {
    if (!config.sm.enabled) return next(null, i18n.__('FEATURE_DISABLED'));

    const mailOptions = {
      from: FROM,
      to: email,
      subject: i18n.__('Activate your account'),
      // Plain Text Version
      text:
        i18n.__('Click this link to activate your account : ') +
        config.host +
        'access/activate/' +
        code,
      // HTML Version
      html:
        '<p>' +
        i18n.__('Click this link to activate your account : ') +
        '<a href="' +
        config.host +
        'access/activate/' +
        code +
        '">' +
        i18n.__('Activate your account') +
        '</a></p>',
    };

    // Send
    SendMail(mailOptions, function(err, sent) {
      return next(err, sent);
    });
  } catch (e) {
    logger.log('error', 'SENDMAIL : ' + e);
    return next(e, null);
  }
};

const ForgotPassword = (email, code, next) => {
  try {
    if (!config.sm.enabled) return next(null, i18n.__('FEATURE_DISABLE'));

    const mailOptions = {
      from: FROM,
      to: email,
      subject: i18n.__('Procedure to reset your password'),
      // Plain Text Version
      text:
        i18n.__(
          'If you ask for a new password, click the link to change it : '
        ) +
        config.host +
        'access/retrieve/' +
        code,
      // HTML Version
      html:
        '<p>' +
        i18n.__(
          'If you ask for a new password, click the link to change it : '
        ) +
        '<a href="' +
        config.host +
        'access/retrieve/' +
        code +
        '">' +
        i18n.__('Change my password') +
        '</a></p>',
    };

    // Send
    SendMail(mailOptions, function(err, sent) {
      return next(err, sent);
    });
  } catch (e) {
    logger.log('error', 'SENDMAIL : ' + e);
    return next(e, null);
  }
};

module.exports = {SendValidationCode, ForgotPassword};
