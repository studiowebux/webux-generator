// ██████╗ ██╗   ██╗███████╗███████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ██║   ██║██║   ██║█████╗  ███████╗   ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ╚██████╔╝╚██████╔╝███████╗███████║   ██║   ██║╚██████╔╝██║ ╚████║███████║
//  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

/**
 * File: questions.js
 * Author: Tommy Gingras
 * Date: 2018-24-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const path = require("path");

const questions = [
  {
    name: "moduleName",
    type: "input",
    message: "Module name:",
    validate: function(input) {
      if (/^([A-Za-z])+$/.test(input)) {
        return true;
      }
      return "The module name may only include letters";
    }
  },
  {
    name: "author",
    type: "input",
    message: "Author name:"
  },
  {
    name: "license",
    type: "input",
    message: "License:"
  },
  {
    name: "backendDir",
    type: "input",
    message: "Backend Directory:",
    default: path.join(__dirname, "..", "..", "new-project", "backend")
  },
  {
    name: "apiVersion",
    type: "input",
    message: "Backend API Version:",
    default: "v1"
  }
];

module.exports = {
  questions
};
