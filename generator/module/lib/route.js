/**
 * File: route.js
 * Author: Tommy Gingras
 * Date: 2019-07-19
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const path = require("path");
const fs = require("fs");
const NewRoute = require("./route_definitions");

const updateRoute = (backendDir, moduleName, apiVersion) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(
        path.join(backendDir, "config", "routes.js"),
        "utf8",
        (err, data) => {
          if (err) {
            reject(err);
          }

          if (data.indexOf('"/' + moduleName + '"') !== -1) {
            console.error(
              "The resource is already present in the route file. SKIPPING"
            );
            return resolve();
          }

          const current = NewRoute(moduleName, apiVersion, data, "CRUD");

          fs.writeFile(
            path.join(backendDir, "config", "routes.js"),
            current,
            err => {
              if (err) {
                reject(err);
              }

              console.log("Route Definition updated.");
              return resolve();
            }
          );
        }
      );
    } catch (e) {
      throw e;
    }
  });
};

module.exports = { updateRoute };
