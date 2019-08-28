// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: {{moduleFilename}}
 * Author: {{author}}
 * Date: {{creationDate}}
 * License: {{license}}
 */

"use strict";

const Webux = require("webux-app");

// action
const find{{modelName}} = async query => {
  const {{plurial}} = await Webux.db.{{modelName}}.find({})
    .lean()
    .select(query.projection || Webux.constants.{{moduleName}}.select)
    .limit(query.limit)
    .sort(query.sort)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!{{plurial}} || {{plurial}}.length === 0) {
    throw Webux.errorHandler(404, "{{plurial}} not found");
  }
  return Promise.resolve(Webux.toObject({{plurial}}));
};

// route
/**
 * @apiGroup {{modelName}}
 * @api {get} /api/v1/{{moduleName}} Get all {{plurial}}
 * @apiDescription Get all {{plurial}}
 * @apiName Get all {{plurial}}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *              PUT YOUR SCHEMA HERE
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    const obj = await find{{modelName}}(req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "{{modelName}} not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth
const socket = client => {
  return async () => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await find{{modelName}}({});
      if (!obj) {
        client.emit("gotError", "{{modelName}} not found");
      }

      client.emit("{{moduleName}}Found", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  find{{modelName}},
  socket,
  route
};
