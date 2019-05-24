// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: query.js
 * Author: Tommy Gingras
 * Date: 2019-02-26
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

'use strict';

const i18n = require('i18n');
const Trim = require('../tools/trim');
const parser = require('mongo-qp');
const ParseQuery = parser.ParseQuery;
const filter = require('wordfilter');
const _error = require('../tools/error');

module.exports = (blacklist, defaultSelect) => {
  return (req, res, next) => {
    // Define the words blacklisted
    // When a user request specific information, we want to protect the sensitive datas.
    filter.addWords(blacklist);

    if (req.query && filter.blacklisted(JSON.stringify(req.query))) {
      return next(
        _error(
          'QUERY PARSER',
          400,
          i18n.__('INVALID_REQUEST'),
          'Query may contains blacklisted items.'
        )
      );
    } else {
      const parsedQuery = ParseQuery(req.query);

      if (parsedQuery.projection) {
        parsedQuery.projection = Trim(
          parsedQuery.projection,
          blacklist,
          defaultSelect
        );
      } else {
        parsedQuery.projection = defaultSelect;
      }
      req.query = parsedQuery;
      return next();
    }
  };
};
