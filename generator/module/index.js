// ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
// ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2018-12-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const { prompt } = require("inquirer");
const { plural } = require("pluralize");
const path = require("path");
const { processFiles, updateInfo, FirstLetterCap } = require("./functions");
const { updateRoute } = require("./lib/route");
const { questions } = require("./questions");
const today = new Date().toISOString().slice(0, 10);

// Ask the question to create the files.
prompt(questions).then(answers => {
  const moduleName = answers["moduleName"].toLowerCase();
  const author = answers["author"];
  const license = answers["license"];
  const backendDir = answers["backendDir"];
  const apiVersion = answers["apiVersion"];
  const creationDate = today;
  const modelName = FirstLetterCap(moduleName);
  const moduleFilename = moduleName + ".js";
  const plurial = plural(moduleName);

  const files = [
    path.join(
      backendDir,
      "api",
      apiVersion,
      "actions",
      moduleName,
      "create.js"
    ),
    path.join(
      backendDir,
      "api",
      apiVersion,
      "actions",
      moduleName,
      "update.js"
    ),
    path.join(
      backendDir,
      "api",
      apiVersion,
      "actions",
      moduleName,
      "remove.js"
    ),
    path.join(backendDir, "api", apiVersion, "actions", moduleName, "find.js"),
    path.join(
      backendDir,
      "api",
      apiVersion,
      "actions",
      moduleName,
      "findOne.js"
    ),
    path.join(backendDir, "models", moduleFilename),
    path.join(backendDir, "tests", "cases", moduleFilename),
    path.join(backendDir, "api", apiVersion, "validations", moduleFilename),
    path.join(backendDir, "api", apiVersion, "helpers", moduleFilename),
    path.join(backendDir, "api", apiVersion, "constants", moduleFilename),
    path.join(backendDir, "defaults", moduleFilename)
  ];
  const options = {
    files: files,
    from: [
      /{{moduleName}}/g,
      /{{author}}/g,
      /{{license}}/g,
      /{{creationDate}}/g,
      /{{modelName}}/g,
      /{{moduleFilename}}/g,
      /{{plurial}}/g
    ],
    to: [
      moduleName,
      author,
      license,
      creationDate,
      modelName,
      moduleFilename,
      plurial
    ]
  };

  Promise.all([processFiles(files)])
    .then(() => {
      console.log("update info");
      updateInfo(options).then(() => {
        updateRoute(backendDir, moduleName, apiVersion);
      });
    })
    .finally(() => {
      console.log("Completed !");
    })
    .catch(error => {
      console.log("indexjs.84");
      console.error(error);
    });
});
