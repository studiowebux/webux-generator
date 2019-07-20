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
const findOne{{modelName}} = async ({{moduleName}}ID, query) => {
  await Webux.isValid.Custom(Webux.validators.{{moduleName}}.MongoID, {{moduleName}}ID);

  const {{moduleName}} = await Webux.db.{{modelName}}.findById({{moduleName}}ID)
    .select(query.projection || Webux.constants.{{moduleName}}.select)
    .catch(e => {
      throw Webux.errorHandler(422, e);
    });
  if (!{{moduleName}}) {
    throw Webux.errorHandler(404, "{{moduleName}} not found");
  }
  return Promise.resolve({{moduleName}});
};

// route
/**
 * @apiGroup {{modelName}}
 * @api {get} /api/v1/{{moduleName}}/:id Get one {{moduleName}}
 * @apiParam {string} id
 * @apiDescription Get one {{moduleName}}
 * @apiName Get one {{moduleName}}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               PUT YOUR SCHEMA HERE
 *           }
 *       }
 **/
const route = async (req, res, next) => {
  try {
    const obj = await findOne{{modelName}}(req.params.id, req.query);
    if (!obj) {
      return next(Webux.errorHandler(404, "{{modelName}} with ID not found."));
    }
    return res.success(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async {{moduleName}}ID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findOne{{modelName}}({{moduleName}}ID, {});
      if (!obj) {
        client.emit("gotError", "{{modelName}} with ID not found");
      }

      client.emit("{{moduleName}}Found", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOne{{modelName}},
  socket,
  route
};
