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
const currentPath = process.cwd();

const questions = [
  {
    name: "templatePath",
    type: "input",
    message: "Template Directory:",
    default: path.join(__dirname, "templates")
  },
  {
    name: "projectDirectory",
    type: "input",
    message: "Project Directory:",
    default: path.join(currentPath, "new-project")
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
