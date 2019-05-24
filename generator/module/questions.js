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

const path = require("path");

const questions = [
  {
    name: "api",
    type: "input",
    message: "resource name:",
    validate: function(input) {
      if (/^([A-Za-z])+$/.test(input)) {
        return true;
      }
      return "Resource may only include letters";
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
    name: "backend_dir",
    type: "input",
    message: "Backend Directory:",
    default: path.join(__dirname, "..", "..", "new-project", "backend")
  }
];

module.exports = {
  questions
};
