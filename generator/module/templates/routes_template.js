// ██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
// ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
// ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
// ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/**
 * File: {{filename}}.js
 * Author: {{author}}
 * Date: {{date}}
 * License: {{license}}
 */

'use strict';

const router = require('express').Router();
const {
  GetAll,
  GetOne,
  Create,
  Update,
  Delete,
} = require('../actions/{{action}}');
const i18n = require('i18n');
const errorHandler = require('../middleware/tools/error');
const Validator = require('../middleware/thirdParty/validator');
const isAuthorized = require('../middleware/auth/isAuthorized');
const isAuthenticated = require('../middleware/auth/isAuthenticated');
const vSchema = require('../validations/{{action}}');
const Cache = require('../middleware/routes/cache');
const Query = require('../middleware/routes/query');
const {blacklist, select} = require('../constants/{{action}}');

/**
 * @apiGroup {{model}}
 * @api {get} /api/{{action}} get all {{action}}s
 * @apiDescription Get all the available {{action}}
 * @apiName {{action}} Get All
 * @apiSuccess {String} message
 * @apiSuccess {String} devMessage
 * @apiSuccess {String} success
 */
router.get('/', Cache, Query(blacklist, select), async (req, res, next) => {
  try {
    const {{action}}s = await GetAll(req.query);

    if (!{{action}}s) {
      return next(errorHandler('GET_{{filename_caps}}', 404, '{{filename_caps}}_NOT_FOUND'));
    }
    return res.status(200).json({
      {{action}}s,
      message: i18n.__('{{filename_caps}}_FOUND'),
      devMessage: {{action}}s.length,
      success: true,
    });
  } catch (e) {
    return next(errorHandler('GET_{{filename_caps}}', e.code, e.message, e.devMessage));
  }
});

/**
 * @apiGroup {{model}}
 * @api {get} /api/{{action}}/:id get one {{action}}
 * @apiDescription Get one {{action}} by id.
 * @apiParam {string} id Mongo ID of the {{action}}
 * @apiName {{action}} Get One
 * @apiSuccess {String} message
 * @apiSuccess {String} devMessage
 * @apiSuccess {String} success
 */
router.get(
  '/:id',
  Validator.MongoID(vSchema.MongoID),
  Query(blacklist, select),
  Cache,
  async (req, res, next) => {
    try {
      const {{action}} = await GetOne(req.query, req.params.id);

      if (!{{action}}) {
        return next(
          errorHandler('GET_{{filename_caps}}', 404, '{{filename_caps}}_NOT_FOUND', req.params.id)
        );
      }
      return res.status(200).json({
        {{action}},
        message: i18n.__('{{filename_caps}}_FOUND'),
        devMessage: req.params.id,
        success: true,
      });
    } catch (e) {
      return next(
        errorHandler('GET_{{filename_caps}}', e.code, e.message, e.devMessage)
      );
    }
  }
);

/**
 * @apiGroup {{model}}
 * @api {post} /api/{{action}} Create new {{model}}
 * @apiDescription Create a new {{action}}
 * @apiName Create {{model}}
 * @apiHeader {string} Authorization The Access Token
 * @apiParam (Request body) {Object} {{action}}
 * @apiSuccess {String} message
 * @apiSuccess {String} devMessage
 * @apiSuccess {String} success
 */
router.post(
  '/',
  isAuthenticated,
  isAuthorized,
  Validator.Body(vSchema.Create),
  async (req, res, next) => {
    try {
      const new{{model}} = await Create(req.body.{{action}});

      if (!new{{model}}) {
        return next(
          errorHandler('CREATE_{{filename_caps}}', 500, i18n.__('{{filename_caps}}_NOT_CREATED')),
          '{{model}} not created.'
        );
      }
      return res.status(201).json({
        {{action}}: new{{model}},
        message: i18n.__('{{filename_caps}}_CREATED'),
        devMessage: new{{model}}._id,
        success: true,
      });
    } catch (e) {
      if (e.code === 11000) {
        return next(
          errorHandler('CREATE_{{filename_caps}}', 422, i18n.__('{{filename_caps}}_ALREADY_EXISTS')),
          '{{filename_caps}} already exists.'
        );
      }
      return next(
        errorHandler(
          'CREATE_{{filename_caps}}',
          e.code,
          e.message || e.errmsg,
          e.devMessage
        )
      );
    }
  }
);

/**
 * @apiGroup {{model}}
 * @api {put} /api/{{action}}/:id Update {{model}}
 * @apiDescription Update a {{action}}
 * @apiName Update {{model}}
 * @apiHeader {string} Authorization The Access Token
 * @apiParam {string} id Mongo ID of the {{action}}
 * @apiParam (Request body) {Object} {{action}}
 * @apiSuccess {String} message
 * @apiSuccess {String} devMessage
 * @apiSuccess {String} success
 */
router.put(
  '/:id',
  isAuthenticated,
  isAuthorized,
  Validator.MongoID(vSchema.MongoID),
  Validator.Body(vSchema.Update),
  async (req, res, next) => {
    try {
      const updated{{model}} = await Update(req.params.id, req.body.{{action}});

      if (!updated{{model}}) {
        return next(
          errorHandler('UPDATE_{{filename_caps}}', 422, '{{filename_caps}}_NOT_UPDATED')
        );
      }

      return res.status(200).json({
        {{action}}: updated{{model}},
        message: i18n.__('{{filename_caps}}_UPDATED'),
        devMessage: req.params.id,
        success: true,
      });
    } catch (e) {
      if (e.code === 11000) {
        return next(
          errorHandler('UPDATE_{{filename_caps}}', 422, i18n.__('{{filename_caps}}_ALREADY_EXISTS')),
          '{{filename_caps}} already exists.'
        );
      }
      return next(
        errorHandler(
          'UPDATE_{{filename_caps}}',
          e.code,
          e.message || e.errmsg,
          e.devMessage
        )
      );
    }
  }
);

/**
 * @apiGroup {{model}}
 * @api {delete} /api/{{action}}/:id Delete {{model}}
 * @apiDescription Delete a {{action}}
 * @apiName Delete {{model}}
 * @apiHeader {string} Authorization The Access Token
 * @apiParam {string} id Mongo ID of the {{action}}
 */
router.delete(
  '/:id',
  isAuthenticated,
  isAuthorized,
  Validator.MongoID(vSchema.MongoID),
  async (req, res, next) => {
    try {
      const removed = await Delete(req.params.id);
      if (!removed) {
        return next(
          errorHandler('DELETE_{{filename_caps}}', 500, i18n.__('{{filename_caps}}_NOT_DELETED')),
          '{{model}} not deleted.'
        );
      }

      return res.status(204).json({});
    } catch (e) {
      return next(
        errorHandler('DELETE_{{filename_caps}}', e.code, e.message, e.devMessage)
      );
    }
  }
);

module.exports = router;
