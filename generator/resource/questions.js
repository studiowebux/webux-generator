// ██████╗ ██╗   ██╗███████╗███████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ██║   ██║██║   ██║█████╗  ███████╗   ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ╚██████╔╝╚██████╔╝███████╗███████║   ██║   ██║╚██████╔╝██║ ╚████║███████║
//  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

/**
 * File: questions.js
 * Author: Tommy Gingras
 * Date: 2020-01-21
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const path = require("path");
const { readCache } = require("./lib/cache");
let currentPath = process.cwd();

// if the user has not provide the backend path, otherwise let the path as is.
if (currentPath.indexOf("backend") < 0) {
  currentPath = path.join(currentPath, "backend");
}

let cache = readCache();

const questions = [
  {
    name: "resourceName",
    type: "input",
    message: "Resource name:",
    validate: function(input) {
      if (/^([A-Za-z])+$/.test(input)) {
        return true;
      }
      return "The resource name may only include letters";
    }
  },
  {
    name: "resourceFolder",
    type: "input",
    message: "Resource Folder (if any):",
    validate: function(input) {
      if (/^([A-Za-z])+$/.test(input) || input === "") {
        return true;
      }
      return "The folder name may only include letters";
    }
  },
  {
    name: "method",
    type: "input",
    message: "Method (get, post, patch, put, delete):",
    validate: function(input) {
      if (input.includes("get") || input.includes("post") || input.includes("patch") || input.includes("put") || input.includes("delete")) {
        return true;
      }
      return "The method may only include : get, post, patch, put, delete";
    }
  },
  {
    name: "author",
    type: "input",
    message: "Author name:",
    default: cache.author || ""
  },
  {
    name: "license",
    type: "input",
    message: "License:",
    default: cache.license || ""
  },
  {
    name: "backendDir",
    type: "input",
    message: "Backend Directory:",
    default: cache.backendDir || path.join(currentPath)
  },
  {
    name: "apiVersion",
    type: "input",
    message: "Backend API Version:",
    default: cache.apiVersion || "v1"
  },
  {
    name: "validation",
    type: "input",
    message: "Is it OK ? (Y/N):",
    default: "Y"
  }
];

module.exports = {
  questions
};
