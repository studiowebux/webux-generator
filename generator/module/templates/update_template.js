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
const updateOne{{modelName}} = async ({{moduleName}}ID, {{moduleName}}) => {
  await Webux.isValid.Custom(Webux.validators.MongoID, {{moduleName}}ID);
  await Webux.isValid.Custom(Webux.validators.{{moduleName}}.Update, {{moduleName}});

  const {{moduleName}}Updated = await Webux.db.{{modelName}}.findByIdAndUpdate(
    {{moduleName}}ID,
    {{moduleName}},
    {
      new: true
    }
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!{{moduleName}}Updated) {
    throw Webux.errorHandler(422, "{{moduleName}} not updated");
  }
  return Promise.resolve({{moduleName}}Updated);
};

// route
/**
 * @apiGroup {{modelName}}
 * @api {put} /api/v1/{{moduleName}}/:id Update a {{moduleName}}
 * @apiParam {string} id 
 * @apiParamExample {json} Request-Example:
 *     {
 *        "{{moduleName}}":{
 *          PUT YOUR SCHEMA HERE
 *        }
 *      }
 * @apiDescription Update a {{moduleName}}
 * @apiName Update a {{moduleName}}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               PUT YOUR SCHEMA HERE
 *               "created_at": "2019-07-17T23:30:49.819Z",
 *               "updated_at": "2019-07-17T23:30:49.819Z",
 *               "__v": 0
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    const obj = await updateOne{{modelName}}(req.params.id, req.body.{{moduleName}});
    if (!obj) {
      return next(Webux.errorHandler(422, "{{modelName}} with ID not updated."));
    }
    return res.updated(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async ({{moduleName}}ID, {{moduleName}}) => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await updateOne{{modelName}}({{moduleName}}ID, {{moduleName}});
      if (!obj) {
        client.emit("gotError", "{{modelName}} with ID not updated");
      }

      client.emit("{{moduleName}}Updated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  updateOne{{modelName}},
  socket,
  route
};