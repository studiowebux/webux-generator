// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: validator.js
 * Author: Tommy Gingras
 * Date: 2019-02-16
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const Error = require('../tools/error');

const Body = (schema) => {
  return (req, res, next) => {
    schema.validate(
      req.body,
      {
        allowUnknown: false,
      },
      (err) => {
        if (err) {
          return next(
            Error('Schema Validator', 400, err.details[0].message, err)
          );
        }
        return next();
      }
    );
  };
};

const MongoID = (schema) => {
  return (req, res, next) => {
    schema.validate(
      req.params.id,
      {
        allowUnknown: false,
      },
      (err) => {
        if (err) {
          return next(
            Error('Schema Validator', 400, err.details[0].message, err)
          );
        }
        return next();
      }
    );
  };
};

const MongoIdOrURL = (schema) => {
  return (req, res, next) => {
    schema.validate(
      req.params.id_url,
      {
        allowUnknown: false,
      },
      (err) => {
        if (err) {
          return next(
            Error('Schema Validator', 400, err.details[0].message, err)
          );
        }
        return next();
      }
    );
  };
};

const User = (schema) => {
  return (req, res, next) => {
    schema.validate(
      req.user,
      {
        allowUnknown: true,
      },
      (err) => {
        if (err) {
          return next(
            Error('Schema Validator', 400, err.details[0].message, err)
          );
        }
        return next();
      }
    );
  };
};

const Headers = (schema) => {
  return (req, res, next) => {
    schema.validate(
      req.headers,
      {
        allowUnknown: true,
      },
      (err) => {
        if (err) {
          return next(
            Error('Schema Validator', 400, err.details[0].message, err)
          );
        }
        return next();
      }
    );
  };
};

const Files = (schema) => {
  return (req, res, next) => {
    schema.validate(
      req.files,
      {
        allowUnknown: true,
      },
      (err) => {
        if (err) {
          return next(
            Error('Schema Validator', 400, err.details[0].message, err)
          );
        }
        return next();
      }
    );
  };
};

module.exports = {
  Body,
  User,
  MongoID,
  MongoIdOrURL,
  Headers,
  Files,
};
