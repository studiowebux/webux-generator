//  █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//

/**
 * File: {{filename}}.js
 * Author: {{author}}
 * Date: {{date}}
 * License: {{license}}
 */

'use strict';

const i18n = require('i18n');
const {{model}} = require('../models/{{action}}');
const errorHandler = require('../middleware/tools/error');

const {
  // HELPER FUNCTIONS
} = require('../helpers/{{action}}');

// GEt all {{actions}}
const GetAll = (params) => {
  return {{model}}.find(params.filter)
    .select(params.projection)
    .limit(params.limit)
    .sort(params.sort);
};

// Get One
const GetOne = (params, {{action}}ID) => {
  const criteria = {
    _id: {{action}}ID,
  };
  return {{model}}.findOne(criteria).select(params.projection);
};

// Create new {{action}}
const Create = ({{action}}) => {
  
};

// Delete a {{action}}
const Delete = ({{action}}ID) => {
  
};

const Update = ({{action}}ID, {{action}}) => {
  
};

module.exports = {
  GetOne,
  GetAll,
  Create,
  Update,
  Delete,
};
